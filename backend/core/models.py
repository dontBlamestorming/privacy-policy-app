from django.db import models
from django.utils.translation import gettext_lazy as _


class PrivacyPolicyForm(models.Model):
    GENDER_CHOICES = (
        ("male", "Male"),
        ("female", "Female"),
    )

    receiver = models.ForeignKey(
        "account.User",
        related_name="form",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    studio = models.ForeignKey(
        "account.Studio", db_column="studio_id", on_delete=models.CASCADE
    )
    name = models.CharField(_("Name"), max_length=16, null=False, blank=False)
    email = models.EmailField(
        _("Email address"), max_length=128, null=False, blank=False
    )
    birthday = models.CharField(_("Birthday"), max_length=16, null=False, blank=False)
    gender = models.CharField(
        _("Gender"), max_length=8, choices=GENDER_CHOICES, null=False, blank=False
    )
    phone = models.CharField(_("Phone number"), max_length=16, null=False, blank=False)
    created = models.DateTimeField(_("Created"), auto_now_add=True)
    sign = models.FileField(
        _("Sign image"), upload_to="files/", null=False, blank=False
    )


class Image(models.Model):
    user = models.ForeignKey(
        "account.User", related_name="file", on_delete=models.CASCADE, null=False
    )
    form = models.ForeignKey("PrivacyPolicyForm", on_delete=models.CASCADE, null=False)
    file = models.FileField(_("PSD image"), upload_to="psd/", null=False, blank=True)
