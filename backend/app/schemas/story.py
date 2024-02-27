from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from enum import Enum


class StoryStatus(str, Enum):
    ONGOING = "Ongoing"
    COMPLETE = "Complete"
    HIATUS = "Hiatus"
    DROPPED = "Dropped"


class StoryGenre(str, Enum):
    FANTASY = "Fantasy"
    SCIFI = "Science Fiction"
    ROMANCE = "Romance"
    HORROR = "Horror"
    MYSTERY = "Mystery"
    THRILLER = "Thriller"
    HISTORICAL = "Historical Fiction"
    ADVENTURE = "Adventure"
    ACTION = "Action"
    COMEDY = "Comedy"
    DRAMA = "Drama"
    CRIME = "Crime Fiction"
    NON_FICTION = "Non-fiction"
    POETRY = "Poetry"
    FAIRYTALE = "Fairytale"
    FABLE = "Fable"
    FOLKLORE = "Folklore"


class Story(BaseModel):
    id: str
    user_id: str
    title: str
    description: str
    genres: List[StoryGenre]
    status: StoryStatus
    follows: int
    date_created: datetime
    date_modified: datetime


class StoryIn(BaseModel):
    title: str
    description: str
    genres: List[StoryGenre]


class StoryUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    genres: Optional[List[StoryGenre]] = None
    status: Optional[StoryStatus] = None
