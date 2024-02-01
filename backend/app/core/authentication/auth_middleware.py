import json
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from schemas.user import ActiveUser
from core.authentication.auth_token import credentials_exception, verify_access_token
from schemas.token import TokenData
from typing import Dict, Any
from core.authentication.hashing import hash_verify
from core.config import settings, mongodb_client

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login")


def get_user(email:str) -> Dict[str, Any]:
    """
    Gets a user from the db storage using their email
    """
    db_name = settings.db_name
    db_storage = mongodb_client[db_name]
    users = db_storage["users"]
    
    user = users.find_one({"email": email})
    if user is None:
        return None
    user_data = json.loads(json.dumps(user, default=str))
    
    return user_data

def authenticate_user(email: str, password: str) -> ActiveUser:
    user = get_user(email)
    if not user:
        # return False
        raise credentials_exception
    # print(user)
    if not hash_verify(password, user['password']):
        # return False
        raise credentials_exception
    if "password" in user:
        del user["password"]
    return user

def get_current_user(token:str = Depends(oauth2_scheme)) -> ActiveUser:
    """
    Gets the current user.
    
    Args:
        token: jwt string containing the user data
        
    Returns:
        Data about the active user
    """
    tokenData: TokenData = verify_access_token(token)
    
    if tokenData.type != 'bearer':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token type"
        )
    
    user = get_user(email=tokenData.email)
    
    if "password" in user:
        del user["password"]
    
    if user is None:
        raise credentials_exception
    return user