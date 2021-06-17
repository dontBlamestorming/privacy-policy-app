from django.db import models
from django.utils.translation import gettext_lazy as _


class PrivacyPolicyForm(models.Model):
    GENDER_CHOICES = (
        ("male", "Male"),
        ("female", "Female"),
    )
    receiver = models.ForeignKey(
        "account.User", related_name="form", on_delete=models.CASCADE
    )
    studio = models.ForeignKey(
        "account.Studio", db_column="studio_id", on_delete=models.CASCADE
    )
    name = models.CharField(_("Name"), max_length=16)
    email = models.EmailField(_("Email address"), max_length=128)
    birthday = models.CharField(_("Birthday"), max_length=16, default="")
    gender = models.CharField(_("Gender"), max_length=8, choices=GENDER_CHOICES)
    phone = models.CharField(_("Phone number"), max_length=16)
    created = models.DateTimeField(_("Created"), auto_now_add=True)
    sign = models.FileField(_("Sign image"), upload_to="files/")


class Image(models.Model):
    user = models.ForeignKey(
        "account.User", related_name="file", on_delete=models.CASCADE
    )
    form = models.ForeignKey("PrivacyPolicyForm", on_delete=models.CASCADE)
    file = models.FileField(_("PSD image"), upload_to="psd/")
