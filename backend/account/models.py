from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    studio = models.ForeignKey("Studio", on_delete=models.CASCADE, null=True)
    is_studio_manager = models.BooleanField(_("Studio manager"), default=False)
    is_studio_member = models.BooleanField(_("Studio member"), default=False)


class Studio(models.Model):
    name = models.CharField(max_length=32, unique=True)
    ceo_name = models.CharField(max_length=32, null=True, blank=True)
    phone = models.CharField(max_length=32, null=True, blank=True)
    address = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self):
        return self.name
