import json
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from core.authentication.auth_middleware import get_current_user
from schemas import comment as p
from typing import Dict, Any, List
from core.storage import storage
from bson.objectid import ObjectId
from datetime import datetime


router = APIRouter()


@router.get(
    path="/stories/{story_id}/chapters/{chapter_id}/comments",
    response_model=List[Dict[str, Any]],
)
def get_chapter_comments(
    story_id: str, chapter_id: str, limit: int = 0
) -> List[Dict[str, Any]]:
    """Gets all comments for a chapter"""
    comments_table = storage.db["comments"]

    storage.verify_chapter_record(story_id, chapter_id)

    comments = comments_table.find({"chapter_id": chapter_id}).limit(limit)

    comments = [json.loads(json.dumps(comment, default=str)) for comment in comments]

    return comments


@router.get(
    path="/stories/{story_id}/chapters/{chapter_id}/comments/{comment_id}",
    response_model=Dict[str, Any],
)
def get_chapter_comment(
    story_id: str, chapter_id: str, comment_id: str
) -> Dict[str, Any]:
    """Gets a comment from a chapter"""

    comment = storage.verify_comment_record(story_id, chapter_id, comment_id)

    comment = json.loads(json.dumps(comment, default=str))

    return comment


@router.post("/stories/{story_id}/chapters/{chapter_id}", response_model=Dict[str, str])
def create_comment(
    data: p.CommentIn,
    story_id: str,
    chapter_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user),
):
    """Creates a comment under a chapter"""
    comments = storage.db["comments"]
    id = None

    date = datetime.utcnow()
    new_comment = {
        "chapter_id": chapter_id,
        "user_id": current_user["_id"],
        "text": data.text,
        "date_created": date,
        "date_modified": date,
    }

    try:
        storage.verify_chapter_record(story_id, chapter_id)

        id = str(comments.insert_one(new_comment).inserted_id)

        message = {"mesage": "Comment created successfully", "id": id}

        return JSONResponse(message, status_code=status.HTTP_201_CREATED)

    except Exception as ex:
        if id:
            comments.delete_one({"_id": ObjectId(id)})
        raise ex


@router.patch(
    "/stories/{story_id}/chapters/{chapter_id}/comments/{comment_id}",
    response_model=Dict[str, str],
)
def update_chapter_details(
    story_id: str,
    chapter_id: str,
    comment_id: str,
    data: p.CommentIn,
    current_user: Dict[str, Any] = Depends(get_current_user),
):
    """Updates a comment under a chapter"""
    comments = storage.db["comments"]

    date = datetime.utcnow()
    comment_data = data.model_dump()
    comment_data["date_modified"] = date

    storage.verify_comment_record(story_id, chapter_id, comment_id, current_user["_id"])

    new_value = {"$set": comment_data}

    comments.update_one({"_id": ObjectId(comment_id)}, new_value)

    message = {"mesage": "Comment updated successfully", "id": chapter_id}

    return JSONResponse(message)


@router.delete(
    "/stories/{story_id}/chapters/{chapter_id}/comments/{comment_id}",
    response_model=Dict[str, str],
)
def delete_comment(
    story_id: str,
    chapter_id: str,
    comment_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user),
):
    """Deletes a comment under a chapter"""

    storage.delete_comment_record(story_id, chapter_id, comment_id, current_user["_id"])

    message = {"mesage": "Comment deleted successfully", "id": comment_id}

    return JSONResponse(message, status_code=status.HTTP_202_ACCEPTED)
