from typing import Any

from pydantic_settings import BaseSettings
from pymongo import MongoClient, ASCENDING
from pymongo.collection import Collection


class Settings(BaseSettings):
    version: str = "1.0"
    releaseId: str = "1.1"
    API_V1_STR: str = "/api/v1"
    # mongodb_client: MongoClient | None
    db_name:str = "prose-haven-database"

    def __init__(self, **values: Any):
        super().__init__(**values)
        # self.mongodb_client = MongoClient("mongodb://mongo_user:mongo_pwd@mongo:27017/")


settings = Settings()
mongodb_client = MongoClient("mongodb://mongo_user:mongo_pwd@mongo:27017/")
mongodb_client[settings.db_name]["users"].create_index([("email", ASCENDING)], unique=True)
mongodb_client[settings.db_name]["users"].create_index([("username", ASCENDING)], unique=True)
# mongodb_client = MongoClient("mongodb://mongo_user:mongo_pwd@localhost:27017/")

