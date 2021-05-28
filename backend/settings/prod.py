import os

from .base import *


DEBUG = False

ALLOWED_HOSTS = ["*"]


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("DJANGO_DB_NAME"),
        "USER": os.getenv("DJANGO_DB_USER"),
        "PASSWORD": os.getenv("DJANGO_DB_PASSWORD"),
        "HOST": os.getenv("DJANGO_DB_HOST"),
        "PORT": os.getenv("DJANGO_DB_PORT"),
    }
}
