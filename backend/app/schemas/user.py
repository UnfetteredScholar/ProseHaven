from pydantic import BaseModel
from typing import List
from datetime import datetime

class UserIn(BaseModel):
    email: str
    username: str
    password: str
    
class User(BaseModel):
    id: str
    email: str
    username: str
    favourites: List[str]
    verified: bool
    date_created: datetime
    date_modified: datetime
    