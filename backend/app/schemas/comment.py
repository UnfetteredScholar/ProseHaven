from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class Comment(BaseModel):
    id: str
    chapter_id: str
    user_id: str
    text: str
    date_created: datetime
    date_modified: datetime


class CommentIn(BaseModel):
    text: str


# class CommentUpdate(BaseModel):
#     text: str
