from typing import Literal
from pydantic import BaseModel


class EmailInput(BaseModel):
    content: str
    type: Literal["plain", "txt", "pdf"]


class UserInput(BaseModel):
    email: str
    password: str
    full_name: str | None = None
    disabled: bool | None = None


class Token(BaseModel):
    access_token: str
    token_type: str
