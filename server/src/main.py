import os
import datetime
from typing import Annotated

from sqlalchemy.orm import Session

from dotenv import load_dotenv

from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from pydantic import BaseModel
from jwt import decode, InvalidTokenError

from .database.init_db import get_db
from .models import Email, User
from .services.infer import get_answer, infer_type
from .utils.security import create_access_token, get_password_hash, verify_password, SECRET_KEY, ALGORITHM, TokenData
from .utils.utils import EmailInput
from .services.extract import extract_text_from_pdf, extract_text_from_txt

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_URL', '')],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    email: str
    password: str
    full_name: str | None = None
    disabled: bool | None = None


class Token(BaseModel):
    access_token: str
    token_type: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')

async def get_user(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.email == username).first()


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = await get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:  # type: ignore
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def _new_input(db, content: str, type: str | None, user_id: int):
    email = Email(
        content=content,
        type=type,
        date=datetime.datetime.now(),
        category=infer_type(content),
        answer=get_answer(content),
        user_id=user_id
    )
    db.add(email)
    db.commit()
    db.refresh(email)

@app.get("/")
def index():    
    return {"message": "Welcome to the Email API"}


@app.post("/new-no-user")
async def read_input_no_user(email_input: EmailInput):
    return JSONResponse(
        content={
            'message': 'Success',
            'answer': get_answer(email_input.content),
            'category': infer_type(email_input.content)
        },
        status_code=200
    )

@app.post('/new-file-no-user')
async def read_file_no_user(file: UploadFile = File(...)):
    content = await file.read()
    text = None
    if file.content_type == 'application/pdf':
        text = extract_text_from_pdf(content)
    elif file.content_type == 'text/plain':
        text = extract_text_from_txt(content)
    if text:
        return JSONResponse(
            content={
                'message': 'Success',
                'answer': get_answer(text),
                'category': infer_type(text)
            },
            status_code=200
        )

@app.post('/new-file')
async def read_file(file: UploadFile = File(...), db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    content = await file.read()
    text = None
    type = None
    if file.content_type == 'application/pdf':
        text = extract_text_from_pdf(content)
        type = 'pdf'
    elif file.content_type == 'text/plain':
        text = extract_text_from_txt(content)
        type = 'txt'
    if text:
        _new_input(
            db,
            text,
            type,
            current_user.user.id
        )
        return JSONResponse(
            content={
                'message': 'Email added successfully',
                'answer': get_answer(text)
            },
            status_code=201
        )

@app.post("/new")
async def read_input(email_input: EmailInput, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    _new_input(
        db,
        email_input.content,
        type=email_input.type,
        user_id=current_user.user.id,
    )

    return JSONResponse(
        content={
            'message': 'Email added successfully',
            'answer': get_answer(email_input.content)
        },
        status_code=201
    )


@app.post("/user")
async def create_user(user: UserInput, db: Session = Depends(get_db)):
    existing_user = await get_user(db, username=user.email)
    if existing_user:
        return JSONResponse(
            content={"message": "User already exists"},
            status_code=400
        )
    db_user = User(
        email=user.email,
        password=get_password_hash(user.password),
        full_name=user.full_name,
        disabled=user.disabled
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return JSONResponse(
        content={"message": "User created successfully"},
        status_code=201
    )


@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(form_data)
    user = await get_user(db, username=form_data.username)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not verify_password(form_data.password, user.password):  # type: ignore
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")

    access_token = create_access_token(data={"sub": user.email})
    return JSONResponse(content={"access_token": access_token, "token_type": "Bearer"}, status_code=200)


@app.get("/emails/")
async def list_emails(db: Annotated[Session, Depends(get_db)], current_user: Annotated[User, Depends(get_current_user)]):
    print(current_user)
    emails = db.query(Email).filter(Email.user_id == current_user.id).all()
    return emails
