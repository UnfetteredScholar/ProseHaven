from fastapi import APIRouter, Depends
from core.authentication.auth_middleware import get_current_user
from schemas.user import ActiveUser 
from typing import Dict, Any

router = APIRouter()



@router.get(path="/users/me",
            response_model=Dict[str,Any])
async def get_user_details(current_user: ActiveUser = Depends(get_current_user)) -> Dict[str, Any]:
    """Gets the user details"""

    return current_user
    