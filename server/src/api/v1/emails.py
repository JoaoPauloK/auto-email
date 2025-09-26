from typing import Annotated
from fastapi import APIRouter, Depends, File, UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from server.src.database.init_db import get_db
from server.src.models.models import Email, User
from server.src.services.extract import extract_text_from_pdf, extract_text_from_txt
from server.src.services.infer import get_answer, infer_type
from server.src.utils.schema import EmailInput
from server.src.utils.utils import create_new_email_entry, get_current_user

router = APIRouter()


@router.post("/new-no-user")
async def read_input_no_user(email_input: EmailInput):
    return JSONResponse(
        content={
            "message": "Success",
            "answer": get_answer(email_input.content),
            "category": infer_type(email_input.content),
        },
        status_code=200,
    )


@router.post("/new-file-no-user")
async def read_file_no_user(file: UploadFile = File(...)):
    content = await file.read()
    text = None
    if file.content_type == "application/pdf":
        text = extract_text_from_pdf(content)
    elif file.content_type == "text/plain":
        text = extract_text_from_txt(content)
    if text:
        return JSONResponse(
            content={
                "message": "Success",
                "answer": get_answer(text),
                "category": infer_type(text),
            },
            status_code=200,
        )


@router.post("/new-file")
async def read_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    content = await file.read()
    text = None
    type = None
    if file.content_type == "application/pdf":
        text = extract_text_from_pdf(content)
        type = "pdf"
    elif file.content_type == "text/plain":
        text = extract_text_from_txt(content)
        type = "txt"
    if text:
        create_new_email_entry(db, text, type, current_user.id)
        return JSONResponse(
            content={
                "message": "Success",
                "answer": get_answer(text),
                "category": infer_type(text),
            },
            status_code=201,
        )


@router.post("/new")
async def read_input(
    email_input: EmailInput,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    create_new_email_entry(
        db,
        email_input.content,
        type=email_input.type,
        user_id=current_user.id,
    )

    return JSONResponse(
        content={
            "message": "Success",
            "answer": get_answer(email_input.content),
            "category": infer_type(email_input.content),
        },
        status_code=201,
    )


@router.get("/emails")
async def list_emails(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    emails = db.query(Email).filter(Email.user_id == current_user.id).all()
    return emails
