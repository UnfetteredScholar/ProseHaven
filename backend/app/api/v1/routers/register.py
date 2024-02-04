from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from core.authentication.auth_middleware import get_user
from core.authentication.auth_token import create_access_token, verify_access_token
from core.authentication.email_verification import send_email_verification
from core.authentication.hashing import get_hash
from schemas.user import UserIn
from schemas.token import EmailVerificationToken
from core.storage import storage
from jose import ExpiredSignatureError
from datetime import timedelta
from pydantic import BaseModel
from typing import Dict
from datetime import datetime


router = APIRouter()


class EmailInput(BaseModel):
    email: str

@router.post("/register",
             response_model=Dict[str, str])
def register(form_data: UserIn) -> JSONResponse:
    """Performs user registration"""
    users_table = storage.db["users"]

    if users_table.find_one({"email": form_data.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already taken"
            )
    
    if users_table.find_one({"username": form_data.username}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="username already taken"
            )
    
    try:
        date = datetime.utcnow()
        user = {
            "email": form_data.email,
            "username": form_data.username,
            "password": get_hash(form_data.password),
            "favourites": [],
            "verified": False,
            "date_created": date,
            "date_modified": date
        }
            
        id = str(users_table.insert_one(user).inserted_id)
        verification_token = create_access_token({"id": id, "sub": user["email"], "type": "email_verification"}, timedelta(hours=1))
        
        send_email_verification(user["email"], verification_token)
        
        response_message = {
            "message": "Account created successfully.\nEmail Verification sent.",
            "token_expire": "1 Hour",
            "email": user["email"]
            }

        return JSONResponse(response_message, status_code=201)
    except Exception as ex:
        if users_table.find_one({"email": form_data.email}):
            users_table.delete_one({"email": form_data.email})
        raise ex
    # return Token(access_token=access_token, token_type="bearer")

@router.post("/register/verify",
             response_model=Dict[str, str])
def verify_email(verification_token: EmailVerificationToken) -> JSONResponse:
    """Performs user email verification"""
    users_table = storage.db["users"]
    
    try:
        token_data = verify_access_token(verification_token.verification_token)
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Verification token expired"
            )
        
    if token_data.type != 'email_verification':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token type"
            )

    if not users_table.find_one({"email": token_data.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Account not found"
            )
    new_value = { "$set": {"verified": True} }
    users_table.update_one({"email": token_data.email}, update=new_value)
    
    
    return JSONResponse({"message": "Account verified successfuly"})


@router.post("/register/verify/resend",
             response_model=Dict[str, str])
def resend_verification(email: EmailInput) -> JSONResponse:
    """Resends email verification"""
    user = get_user(email.email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Account not found"
            )
    
    if user["verified"]:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Account already verified"
        )
    
    verification_token = create_access_token({"id": user["_id"], "sub": user["email"], "type": "email_verification"}, timedelta(hours=1))
    
    send_email_verification(user["email"], verification_token)
    
    response_message = {
        "message": "Email verification token resent",
        "token_expire": "1 Hour",
        "email": user["email"]
        }

    return JSONResponse(response_message, status_code=200)