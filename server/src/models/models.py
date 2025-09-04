import enum
from sqlalchemy import Column, ForeignKey, Integer, DateTime, Enum, Text, String, Boolean
from database.database import Base


class Categories(enum.Enum):
    produtiva = 'produtiva'
    improdutiva = 'improdutiva'

class EmailTypes(enum.Enum):
    plain = 'plain'
    txt = 'txt'
    pdf = 'pdf'


class Email(Base):
    __tablename__ = "emails"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(Enum(EmailTypes))
    date = Column(DateTime)
    content = Column(Text)
    category = Column(Enum(Categories))
    answer = Column(Text)


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(256), unique=True, index=True)
    password = Column(String(256))
    full_name = Column(String(256))
    disabled = Column(Boolean, default=False)
