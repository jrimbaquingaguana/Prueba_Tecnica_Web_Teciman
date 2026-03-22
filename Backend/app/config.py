import os
import pymysql
from dotenv import load_dotenv

pymysql.install_as_MySQLdb()
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAILTRAP_API_TOKEN = os.getenv("MAILTRAP_API_TOKEN")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")
    MAIL_DEFAULT_SENDER_NAME = os.getenv("MAIL_DEFAULT_SENDER_NAME")
    MAIL_RECIPIENT = os.getenv("MAIL_RECIPIENT")