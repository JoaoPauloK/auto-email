from .database import Base, engine
from models import Email

def migrate():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Migrating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created!")

if __name__ == "__main__":
    migrate()
