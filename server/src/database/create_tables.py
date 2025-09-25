from .database import Base, engine
from ..models.models import Email, User

def migrate():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Tables created!")
    print("Tabelas criadas:", list(Base.metadata.tables.keys()))


if __name__ == "__main__":
    migrate()
