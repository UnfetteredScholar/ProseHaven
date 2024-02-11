import json
from fastapi import APIRouter, Depends, Body, HTTPException, status
from core.authentication.auth_middleware import get_current_user
from schemas.user import User
from typing import Dict, Any, List
from core.storage import storage
from bson.objectid import ObjectId


router = APIRouter()


@router.get(path="/users/me", response_model=Dict[str, Any])
async def get_user_details(
    current_user: User = Depends(get_current_user),
) -> Dict[str, Any]:
    """Gets the user details"""

    return current_user


@router.get(path="/users/{user_id}", response_model=Dict[str, Any])
async def get_user_details(user_id: str) -> Dict[str, Any]:
    """Gets the user details by their id"""
    user = storage.verify_user_record(user_id)

    user_data = json.loads(json.dumps(user, default=str))

    for key in ["password", "email"]:
        if key in user_data:
            del user_data[key]

    return user_data


@router.patch(path="/users/follows")
def follow_story(
    story_id: str = Body(embed=True), current_user=Depends(get_current_user)
):
    """Adds a story to the current user's follow list"""

    storage.verify_story_record(story_id)

    follows = list(set(current_user["follows"] + [story_id]))

    if story_id in current_user["follows"]:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Story already followed"
        )

    users = storage.db["users"]

    new_value = {"$set": {"follows": follows}}

    users.update_one({"_id": ObjectId(current_user["_id"])}, new_value)

    message = {"message": "Follow added to list"}

    return message


@router.delete(path="/users/follows/{story_id}")
def unfollow_story(story_id: str, current_user=Depends(get_current_user)):
    """Removes a story to the current user's follow list"""

    follows: List[str] = current_user["follows"]

    # storage.verify_story_record(story_id)

    if story_id not in follows:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Story not in follow list"
        )

    follows.remove(story_id)

    users = storage.db["users"]

    new_value = {"$set": {"follows": follows}}

    users.update_one({"_id": ObjectId(current_user["_id"])}, new_value)

    message = {"message": "Follow removed from to list"}

    return message


# @router.put(path="/users/{user_id}",
#             response_model=Dict[str,Any])
# async def get_user_details(user_id: str, current_user: User = Depends(get_current_user)) -> Dict[str, Any]:
#     """Updates the user details by their id"""
#     db_name = settings.db_name
#     db_storage = mongodb_client[db_name]
#     users = db_storage["users"]

#     user = users.find_one({"_id": ObjectId(user_id)})

#     if current_user["_id"] != user_id:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
#                             detail="Access denied")

#     if user is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail="User not found")

#     user_data = json.loads(json.dumps(user, default=str))

#     for key in ["password", "email"]:
#         if key in user_data:
#             del user_data[key]

#     return user_data
