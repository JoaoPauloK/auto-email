from typing import Literal
from pydantic import BaseModel

class EmailInput(BaseModel):
    content: str
    type: Literal['plain', 'txt', 'pdf']