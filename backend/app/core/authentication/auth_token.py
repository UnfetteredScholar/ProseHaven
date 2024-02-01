from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Dict, Any, Union
from schemas.token import TokenData
from os import getenv
from dotenv import load_dotenv
from fastapi import HTTPException, status

load_dotenv()
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_DAYS = getenv("ACCESS_TOKEN_EXPIRE_DAYS")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

def create_access_token(data: Dict[str, Any], expires_delta: Union[timedelta, None] = None) -> str:
    """
    Creates a jwt access token using the data provided
    
    Args:
        data: data to be encoded into the token
        expires_delta: period of time which the token will be valid
    
    Returns:
        encoded jwt string
    """

    to_encode = data.copy()
    if expires_delta is not None:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=int(ACCESS_TOKEN_EXPIRE_DAYS))

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str) -> TokenData:
    """
    Verifies an access token
    
    Args:
        token: the jwt token string
        
    Returns:
        TokenData object containing the data in the token
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        id: str = payload.get("id")
        token_type: str = payload.get("type")
        # role: str = payload.get("role")
        
        if email is None or id is None:
            raise credentials_exception
        
        return TokenData(email=email, id=id, type=token_type)
    except JWTError:
        raise credentials_exception
    