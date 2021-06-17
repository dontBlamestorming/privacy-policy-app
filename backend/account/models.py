from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)


class AccountManager(BaseUserManager):
    def create_superuser(self, email, name, password, **other_fields):
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_active", True)
        other_fields.setdefault("is_superuser", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff=True")
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned to is_superuser=True.")

        return self.create_user(email, name, password, **other_fields)

    def create_user(self, email, name, password, **other_fields):
        if not email:
            raise ValueError(_("You must provide an email address"))

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **other_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    studio = models.ForeignKey("Studio", on_delete=models.CASCADE, null=True)
    email = models.EmailField(_("Email address"), max_length=128, unique=True)
    name = models.CharField(_("User name"), max_length=32, unique=True)
    date_joined = models.DateTimeField(_("Date joined"), default=timezone.now)
    is_studio_manager = models.BooleanField(_("Studio manager"), default=False)
    is_studio_staff = models.BooleanField(_("Studio staff"), default=False)
    is_staff = models.BooleanField(_("Is staff"), default=False)
    is_active = models.BooleanField(_("Is active"), default=True)

    objects = AccountManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.name

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email


class Studio(models.Model):
    name = models.CharField(max_length=32, unique=True)
    ceo_name = models.CharField(max_length=32, null=True, blank=True)
    phone = models.CharField(max_length=32, null=True, blank=True)
    address = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self):
        return self.name
