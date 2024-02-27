from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from core.authentication.auth_middleware import get_user
from core.authentication.auth_token import create_access_token, verify_access_token
from core.authentication.email_verification import send_reset_email
from core.authentication.hashing import get_hash
from core.storage import storage
from jose import ExpiredSignatureError
from datetime import timedelta
from pydantic import BaseModel
from typing import Dict

router = APIRouter()


class ResetPasswordRequest(BaseModel):
    email: str


class PasswordResetRequest(BaseModel):
    email: str
    token: str
    new_password: str


@router.post("/forgot_password", response_model=Dict[str, str])
def forgot_password(request: ResetPasswordRequest) -> JSONResponse:
    """Sends a password reset to the user's email"""
    user = get_user(request.email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Account not found"
        )

    reset_token = create_access_token(
        {"id": user["_id"], "sub": user["email"], "type": "password_reset"},
        timedelta(hours=1),
    )

    send_reset_email(user["email"], reset_token)

    response_message = {
        "message": "Email Reset sent.",
        "token_expire": "1 Hour",
        "email": user["email"],
    }

    return JSONResponse(response_message, status_code=200)


@router.post("/reset_password", response_model=Dict[str, str])
def reset_password(request: PasswordResetRequest) -> JSONResponse:
    """Resets a user's password"""
    users_table = storage.db["users"]

    try:
        token_data = verify_access_token(request.token)
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Reset token expired"
        )

    if token_data.type != "password_reset":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token type"
        )

    if token_data.email != request.email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email does not match token"
        )

    if request.new_password == "" or request.new_password is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid password"
        )

    if not users_table.find_one({"email": token_data.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Account not found"
        )

    new_value = {"$set": {"password": get_hash(request.new_password)}}
    users_table.update_one({"email": token_data.email}, update=new_value)

    return JSONResponse({"message": "Password reset successfully"})
