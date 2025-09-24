import os

from datetime import datetime, timedelta, timezone
from jwt import encode
from dotenv import load_dotenv
from passlib.context import CryptContext
from pydantic import BaseModel

load_dotenv()

SECRET_KEY = os.getenv('JWT_SECRET_KEY') or ''
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 300 # TODO diminuir duraçao e usar refresh token

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
