import json
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from core.authentication.auth_middleware import get_current_user
from schemas import chapter as p
from typing import Dict, Any, List
from core.storage import storage
from bson.objectid import ObjectId
from datetime import datetime


router = APIRouter()




@router.get(path="/stories/{story_id}/chapters",
            response_model=List[Dict[str,Any]])
def get_chapters(story_id: str, limit: int = 0, with_content: bool = False) -> List[Dict[str, Any]]:
    """Gets all chapters for a story"""
    chapters_table = storage.db["chapters"]
    
    
    storage.verify_story_record(story_id)
    
    # if limit:
    #     chapters = chapters_table.find({"story_id": story_id}, max=limit)
    # else:
    chapters = chapters_table.find({"story_id": story_id}).limit(limit)
    
    chapters = [json.loads(json.dumps(chapter, default=str)) for chapter in chapters]
    
    if not with_content:
        for chapter in chapters:
            del chapter["content"]

    return chapters


@router.get(path="/stories/{story_id}/chapters/{chapter_id}",
            response_model=Dict[str,Any])
def get_chapters(story_id: str, chapter_id: str) -> Dict[str, Any]:
    """Gets a chapter from a story"""    
    chapter = storage.verify_chapter_record(story_id, chapter_id)
    
    chapter = json.loads(json.dumps(chapter, default=str))

    return chapter


@router.post("/stories/{story_id}/chapters",
             response_model=Dict[str,str])
def create_chapter(data: p.ChapterIn, story_id: str, current_user:Dict[str, Any] = Depends(get_current_user)):
    """Creates a chapter under a story"""
    chapters = storage.db["chapters"]
    id = None
    
    date = datetime.utcnow()
    new_chapter = {
        "story_id": story_id,
        "title": data.title,
        "content": data.content,
        "date_created": date,
        "date_modified": date
    }
    
    try:
        storage.verify_story_record(story_id, current_user["_id"]) 
        
        id = str(chapters.insert_one(new_chapter).inserted_id)
        
        message = {
            "mesage": "Chapter created successfully",
            "id": id
        }
        
        return JSONResponse(message, status_code=status.HTTP_201_CREATED)
    
    except Exception as ex:
        if id:
            chapters.delete_one({"_id": ObjectId(id)})
        raise ex
        

@router.put("/stories/{story_id}/chapters/{chapter_id}",
             response_model=Dict[str,str])
def update_chapter_details(story_id: str, chapter_id: str, data: p.ChapterUpdate, current_user:Dict[str, Any] = Depends(get_current_user)):
    """Updates a chapter under a story"""
    chapters = storage.db["chapters"]
    
    date = datetime.utcnow()
    data = data.model_dump()
    chapter_data = {}
    for key in data:
        if data[key]:
            chapter_data[key] = data[key]
    chapter_data["date_modified"] = date
    
    storage.verify_chapter_record(story_id, chapter_id, current_user["_id"])
        
    new_value = {"$set": chapter_data}
    
    chapters.update_one({"_id": ObjectId(chapter_id)}, new_value)
    
    message = {
        "mesage": "Chapter updated successfully",
        "id": chapter_id
    }
    
    return JSONResponse(message)


# @router.delete("/stories/{story_id}/chapters/{chapter_id}",
#              response_model=Dict[str,str])
# def delete_story(story_id: str, chapter_id: str, current_user:Dict[str, Any] = Depends(get_current_user)):
#     """Deletes a story under a user"""
#     db_name = settings.db_name
#     db_storage = mongodb_client[db_name]
#     stories = db_storage["stories"]
#     chapters = db_storage["chapters"]
    
    
#     story = stories.find_one({"_id": ObjectId(story_id)})
#     if  story is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail="Story not found")
        
#     if story["user_id"] != current_user["_id"]:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
#                             detail="Not authorized")
    
#     chapter = chapters.find_one({"_id": ObjectId(chapter_id)})
#     if  chapter is None or chapter["story_id"] != story_id:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail="Chapter not found")
    
    
#     chapters.delete_one({"_id": ObjectId(chapter_id)})
        
#     message = {
#         "mesage": "Chapter deleted successfully",
#         "id": story_id
#     }
    
#     return JSONResponse(message, status_code=status.HTTP_202_ACCEPTED)