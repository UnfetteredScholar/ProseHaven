import json
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from core.authentication.auth_middleware import get_current_user
from schemas import story as p
from typing import Dict, Any, List, Union
from core.storage import storage
from bson.objectid import ObjectId
from datetime import datetime


router = APIRouter()



@router.get(path="/stories",
            response_model=List[Dict[str,Any]])
def get_stories(limit: int = 0) -> List[Dict[str,Any]]:
    """Gets a list of stories in the database"""
    stories_table = storage.db["stories"]
    
    # if not limit:
    stories = stories_table.find().limit(limit)
    # else:
        # stories = stories_table.find(max=limit)
    
    stories_list = [json.loads(json.dumps(story, default=str)) for story in stories]
    

    return stories_list


@router.get(path="/stories/{story_id}",
            response_model=Dict[str,Any])
def get_story(story_id: str) -> Dict[str, Any]:
    """Gets the story details by its id"""
    
    story = storage.verify_story_record(story_id)
    
    story_data = json.loads(json.dumps(story, default=str))

    return story_data


@router.post("/stories",
             response_model=Dict[str,str])
def create_story(data: p.StoryIn, current_user:Dict[str, Any] = Depends(get_current_user)):
    """Creates a story under a user"""
    stories = storage.db["stories"]
    id = None
    
    date = datetime.utcnow()
    new_story = {
        "user_id": current_user["_id"],
        "title": data.title,
        "description": data.description,
        "genres": data.genres,
        "status": p.StoryStatus.ONGOING.value,
        "follows": 0,
        "date_created": date,
        "date_modified": date
    }
    
    try:
        id = str(stories.insert_one(new_story).inserted_id)
        
        message = {
            "mesage": "Story created successfully",
            "id": id
        }
        
        return JSONResponse(message, status_code=status.HTTP_201_CREATED)
    
    except Exception as ex:
        if id:
            stories.delete_one({"_id": ObjectId(id)})
        raise ex
        

@router.put("/stories/{story_id}",
             response_model=Dict[str,str])
def update_story_details(story_id: str, data: p.StoryUpdate, current_user:Dict[str, Any] = Depends(get_current_user)):
    """Updates a story under a user"""
    stories = storage.db["stories"]
    
    storage.verify_story_record(story_id, current_user["_id"])
    
    date = datetime.utcnow()
    data = data.model_dump()
    new_data = {}
    for key in data:
        if data[key]:
            new_data[key] = data[key]
    new_data["date_modified"] = date
    new_value = {"$set": new_data}
    
    stories.update_one({"_id": ObjectId(story_id)}, new_value)
        
    message = {
        "mesage": "Story updated successfully",
        "id": story_id
    }
    
    return JSONResponse(message)


# @router.delete("/stories/{story_id}",
#              response_model=Dict[str,str])
# def delete_story(story_id: str, current_user:Dict[str, Any] = Depends(get_current_user)):
#     """Deletes a story under a user"""
#     db_name = settings.db_name
#     db_storage = mongodb_client[db_name]
#     stories = db_storage["stories"]
#     story = stories.find_one({"_id": ObjectId(story_id)})
    
#     if story is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail="Story not found")
        
#     if story['user_id'] != current_user["_id"]:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
#                             detail="Not authorized")
    
    
#     stories.delete_one({"_id": ObjectId(story_id)})
        
#     message = {
#         "mesage": "Story deleted successfully",
#         "id": story_id
#     }
    
#     return JSONResponse(message, status_code=status.HTTP_202_ACCEPTED)