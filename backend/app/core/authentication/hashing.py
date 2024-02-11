from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hash(data: str) -> str:
    return pwd_context.hash(data)


def hash_verify(plain_text: str, hashed_text: str) -> bool:
    return pwd_context.verify(plain_text, hashed_text)
