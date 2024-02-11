from fastapi import HTTPException, status
from pymongo import MongoClient, ASCENDING
from bson.objectid import ObjectId

DB_NAME = "prose-haven-database"


class ProseHavenStorage:
    """
    Defines functions for interacting
    with the prose haven db storage
    """

    def __init__(self):
        """Initializes the storage class"""
        self.client = MongoClient("mongodb://mongo_user:mongo_pwd@mongo:27017/")
        self.db = self.client[DB_NAME]
        self.db["users"].create_index([("email", ASCENDING)], unique=True)
        self.db["users"].create_index([("username", ASCENDING)], unique=True)

    def verify_user_record(self, user_id: str):
        """Checks if a user record exists in the db using its id"""
        users = self.db["users"]

        user = users.find_one({"_id": ObjectId(user_id)})

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        return user

    def verify_story_record(self, story_id: str, user_id: str = None):
        """
        Checks if a story record exists.
        If the user_id is not none,
        checks if the user is the creator of the story.
        """

        stories = self.db["stories"]
        story = stories.find_one({"_id": ObjectId(story_id)})

        if story is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Story not found"
            )

        if user_id and story["user_id"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Not authorized"
            )

        return story

    def verify_chapter_record(
        self, story_id: str, chapter_id: str, user_id: str = None
    ):
        """
        Checks if a chapter record exists.
        If the user_id is not none,
        checks if the user is the creator of the chapter's story.
        """

        chapters = self.db["chapters"]

        self.verify_story_record(story_id, user_id)

        chapter = chapters.find_one({"_id": ObjectId(chapter_id)})
        if chapter is None or chapter["story_id"] != story_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Chapter not found"
            )

        return chapter

    def verify_comment_record(
        self, story_id: str, chapter_id: str, comment_id: str, user_id: str = None
    ):
        """
        Checks if a comment record exists
        If user_id is not none,
        checks if the user created that comment
        """

        self.verify_chapter_record(story_id, chapter_id)

        comments = self.db["comments"]

        comment = comments.find_one({"_id": ObjectId(comment_id)})
        if comment is None or comment["chapter_id"] != chapter_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found"
            )

        if user_id and comment["user_id"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Not authorized"
            )

        return comment

    def delete_comment_record(
        self, story_id: str, chapter_id: str, comment_id: str, user_id: str
    ):
        """
        Deletes a comment record
        """

        self.verify_comment_record(story_id, chapter_id, comment_id, user_id)

        comments = self.db["comments"]

        comments.delete_one({"_id": ObjectId(comment_id)})

    def delete_chapter_record(self, story_id: str, chapter_id: str, user_id: str):
        """
        Deletes a chapter record
        """
        chapters_table = self.db["chapters"]
        comments_table = self.db["comments"]

        self.verify_chapter_record(story_id, chapter_id, user_id)

        comments = comments_table.find({"chapter_id": chapter_id})

        for comment in comments:
            self.delete_comment_record(story_id, chapter_id, str(comment["_id"]), None)

        chapters_table.delete_one({"_id": ObjectId(chapter_id)})

    def delete_story_record(self, story_id: str, user_id: str):
        """
        Deletes a story record
        """
        stories_table = self.db["stories"]
        chapters_table = self.db["chapters"]

        self.verify_story_record(story_id, user_id)

        chapters = chapters_table.find({"story_id": story_id})

        for chapter in chapters:
            self.delete_chapter_record(story_id, str(chapter["_id"]), None)

        stories_table.delete_one({"_id": ObjectId(story_id)})


storage = ProseHavenStorage()
