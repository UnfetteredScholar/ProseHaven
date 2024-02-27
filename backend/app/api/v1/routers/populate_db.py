import random
from fastapi import APIRouter, Depends
from datetime import datetime
from schemas.story import StoryGenre
from core.authentication.auth_middleware import get_current_user
from core.storage import storage


router = APIRouter()

books = [
    {
        "title": "The Hobbit",
        "description": "Bilbo Baggins, a hobbit, embarks on a journey to reclaim the Lonely Mountain from the dragon Smaug.",
        "genres": [StoryGenre.FANTASY, StoryGenre.ADVENTURE],
        "status": "Ongoing",
        "follows": 87
    },
    {
        "title": "1984",
        "description": "A dystopian novel by George Orwell set in a totalitarian regime where independent thought is outlawed.",
        "genres": [StoryGenre.FANTASY],
        "status": "Ongoing",
        "follows": 95
    },
    {
        "title": "Pride and Prejudice",
        "description": "A classic romantic novel by Jane Austen, exploring themes of love, class, and societal expectations.",
        "genres": [StoryGenre.ROMANCE, StoryGenre.DRAMA],
        "status": "Ongoing",
        "follows": 92
    },
    {
        "title": "The Catcher in the Rye",
        "description": "Holden Caulfield, a teenager, navigates his way through the challenges of adolescence and society.",
        "genres": [StoryGenre.DRAMA],
        "status": "Ongoing",
        "follows": 88
    },
    {
        "title": "To Kill a Mockingbird",
        "description": "Set in the American South, this novel explores racial injustice and moral growth through the eyes of a young girl.",
        "genres": [StoryGenre.DRAMA],
        "status": "Ongoing",
        "follows": 91
    },
    {
        "title": "Harry Potter and the Philosopher's Stone",
        "description": "The first book in the Harry Potter series, following the adventures of a young wizard, Harry Potter.",
        "genres": [StoryGenre.FANTASY, StoryGenre.ADVENTURE],
        "status": "Ongoing",
        "follows": 98
    },
    {
        "title": "The Great Gatsby",
        "description": "Set in the Jazz Age, this novel explores themes of decadence, idealism, and excess.",
        "genres": [StoryGenre.DRAMA, StoryGenre.ROMANCE],
        "status": "Ongoing",
        "follows": 90
    },
    {
        "title": "Lord of the Flies",
        "description": "A group of boys stranded on an uninhabited island descend into savagery, exploring themes of human nature and society.",
        "genres": [StoryGenre.DRAMA],
        "status": "Ongoing",
        "follows": 84
    },
    {
        "title": "The Da Vinci Code",
        "description": "A thriller novel by Dan Brown, following a symbologist and a cryptologist as they unravel a secret society's mysteries.",
        "genres": [StoryGenre.THRILLER, StoryGenre.MYSTERY],
        "status": "Ongoing",
        "follows": 93
    },
    {
        "title": "The Alchemist",
        "description": "A philosophical novel by Paulo Coelho, following a young Andalusian shepherd named Santiago on his journey to Egypt.",
        "genres": [StoryGenre.FABLE, StoryGenre.ADVENTURE],
        "status": "Ongoing",
        "follows": 89
    },
    {
        "title": "The Hunger Games",
        "description": "Set in a dystopian future, this novel follows a young girl, Katniss Everdeen, as she participates in a televised fight to the death.",
        "genres": [StoryGenre.SCIFI, StoryGenre.ADVENTURE],
        "status": "Ongoing",
        "follows": 97
    },
    {
        "title": "The Adventures of Sherlock Holmes",
        "description": "A collection of detective stories featuring the iconic detective Sherlock Holmes and his companion Dr. John Watson.",
        "genres": [StoryGenre.MYSTERY],
        "status": "Ongoing",
        "follows": 96
    },
    {
        "title": "Alice's Adventures in Wonderland",
        "description": "Follow Alice as she falls down a rabbit hole into a fantasy world populated by peculiar creatures and absurd situations.",
        "genres": [StoryGenre.FANTASY, StoryGenre.ADVENTURE],
        "status": "Ongoing",
        "follows": 85
    },
    {
        "title": "The Picture of Dorian Gray",
        "description": "A philosophical novel by Oscar Wilde, exploring themes of vanity, hedonism, and the nature of beauty.",
        "genres": [StoryGenre.HORROR],
        "status": "Ongoing",
        "follows": 86
    },
    {
        "title": "Frankenstein",
        "description": "A Gothic novel by Mary Shelley, telling the story of Victor Frankenstein and the creature he brings to life.",
        "genres": [StoryGenre.HORROR],
		"status": "Ongoing",
        "follows": 86
	}]


chapter_content = """
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et ultrices neque. Ultrices in iaculis nunc sed. Amet consectetur adipiscing elit ut aliquam purus sit. Quisque sagittis purus sit amet volutpat consequat. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Nisi vitae suscipit tellus mauris. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Id velit ut tortor pretium. Blandit volutpat maecenas volutpat blandit aliquam. Amet nisl purus in mollis.

Amet mauris commodo quis imperdiet massa. Luctus venenatis lectus magna fringilla urna porttitor. Diam donec adipiscing tristique risus nec feugiat in fermentum. Blandit massa enim nec dui nunc mattis enim ut. Urna nec tincidunt praesent semper. Auctor elit sed vulputate mi. Elementum tempus egestas sed sed risus. Egestas tellus rutrum tellus pellentesque eu. Rhoncus est pellentesque elit ullamcorper dignissim cras. Facilisis leo vel fringilla est ullamcorper eget. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Amet aliquam id diam maecenas. Pharetra diam sit amet nisl. Et malesuada fames ac turpis. Nunc sed augue lacus viverra. Mauris cursus mattis molestie a iaculis at erat. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Non blandit massa enim nec dui nunc mattis enim ut.

Rhoncus est pellentesque elit ullamcorper. Lectus proin nibh nisl condimentum id venenatis a condimentum. Faucibus nisl tincidunt eget nullam non. Donec et odio pellentesque diam volutpat commodo sed egestas. Augue lacus viverra vitae congue eu consequat ac felis. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. At tempor commodo ullamcorper a lacus vestibulum sed. Lorem sed risus ultricies tristique nulla aliquet. Commodo elit at imperdiet dui accumsan sit amet. Urna et pharetra pharetra massa massa ultricies.

Placerat duis ultricies lacus sed turpis tincidunt id aliquet. Massa placerat duis ultricies lacus sed turpis. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Gravida arcu ac tortor dignissim convallis aenean. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Cras ornare arcu dui vivamus arcu. Vitae congue mauris rhoncus aenean. Leo vel orci porta non pulvinar neque laoreet suspendisse. Tempor orci eu lobortis elementum nibh. Elit pellentesque habitant morbi tristique senectus et. Pellentesque sit amet porttitor eget dolor morbi non. Feugiat vivamus at augue eget arcu. Lacus sed viverra tellus in hac habitasse platea dictumst.
"""

@router.post(path="populate/stories")
def populate_stories(current_user = Depends(get_current_user)):
    """Populates the database with fake stories"""
    authors = storage.db["users"].find()
    authors = [str(author["_id"]) for author in authors]
    ids = []

    for book in books:
        author = random.choice(authors)
        
        book["user_id"] = author
        book["date_created"] = datetime.utcnow()
        book["date_modified"] = datetime.utcnow()
        
        id = str(storage.db["stories"].insert_one(book).inserted_id)
        ids.append(id)
        
    message = {
        "message": "Database stories added successfully",
        "ids": ids
    }
    
    return message



@router.post(path="populate/chapters")
def populate_chapters(current_user = Depends(get_current_user)):
    """Populates the database with fake chapters"""
    books = storage.db["stories"].find()
    books = [str(book["_id"]) for book in books]


    for book in books:
        story_id = book
        for index in range(1, random.randint(5, 10)):
            chapter = {
                "story_id": story_id,
                "title": f"Chapter {index}",
                "content": chapter_content,
                "date_created": datetime.utcnow(),
                "date_modified": datetime.utcnow()
                }
            
            storage.db["chapters"].insert_one(chapter)
        
    message = {
        "message": "Database chapters added successfully"
    }
    
    return message


@router.post(path="populate/comments")
def populate_comments(current_user = Depends(get_current_user)):
    """Populates the database with fake chapters"""
    users = storage.db["users"].find()
    users = [str(user["_id"]) for user in users]
    chapters = storage.db["chapters"].find()


    for chapter in chapters:
        user_id = random.choice(users)
        chapter_id = str(chapter["_id"])
        for _ in range(1, random.randint(5, 10)):
            comment = {
                "chapter_id": chapter_id,
                "user_id": user_id,
                "text": "Thanks for all your wonderful work. Keep it up!!!",
                "date_created": datetime.utcnow(),
                "date_modified": datetime.utcnow()
                }
            
            storage.db["comments"].insert_one(comment)
        
    message = {
        "message": "Database comments added successfully"
    }
    
    return message