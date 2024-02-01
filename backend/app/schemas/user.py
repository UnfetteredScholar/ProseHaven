from pydantic import BaseModel
from typing import Set


class UserIn(BaseModel):
    email: str
    username: str
    password: str
    
class ActiveUser(BaseModel):
    id: str
    email: str
    username: str
    favourites: Set[str]
    