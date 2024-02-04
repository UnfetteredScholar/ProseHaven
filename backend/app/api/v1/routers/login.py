from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas.token import Token
from core.authentication.auth_middleware import authenticate_user
from core.authentication.auth_token import create_access_token

router = APIRouter()



@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
    """Performs user login"""
    
    user = authenticate_user(form_data.username, form_data.password)
    token_data = {
        "sub": user["email"],
        "id": user["_id"],
        # "role": user["role"],
        "type": "bearer"
    }
    access_token = create_access_token(token_data)
    
    return Token(access_token=access_token, token_type="bearer")