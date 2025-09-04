from datetime import datetime, timedelta, timezone
from jwt import encode
from passlib.context import CryptContext
from pydantic import BaseModel


SECRET_KEY = 'e802cc1dd0ae04fad8968fdaae9aa5c0e695878f4004a4a7b95433868ff00da8'
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class TokenData(BaseModel):
    username: str


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    to_encode.update({"exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)})
    return encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_password_hash(password: str) -> str:
    return password_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_context.verify(plain_password, hashed_password)
