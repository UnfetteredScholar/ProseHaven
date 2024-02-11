from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class Chapter(BaseModel):
    id: str
    story_id: str
    title: str
    content: str
    date_created: datetime
    date_modified: datetime


class ChapterIn(BaseModel):
    title: str
    content: str


class ChapterUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
