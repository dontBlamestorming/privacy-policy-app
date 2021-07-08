from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from django.utils.translation import ugettext_lazy as _

from .models import *
from .forms import (
    StudioCreationForm,
    StudioChangeForm,
)


class UserAdmin(BaseUserAdmin):

    list_display = (
        "username",
        "first_name",
        "studio",
        "is_studio_manager",
        "is_studio_member",
        "is_active",
        "is_staff",
    )

    fieldsets = (
          (
            None,
            {"fields": ("first_name", "password", "studio")},
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_studio_manager",
                    "is_studio_member",
                )
            },
        ),
      
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "first_name",
                    "password1",
                    "password2",
                    "studio",
                ),
            },
        ),
    )

    search_fields = ("user", "studio", "is_studio_manager", "is_studio_member")
    ordering = ("is_staff",)


class StudioClass(admin.ModelAdmin):
    form = StudioChangeForm
    add_form = StudioCreationForm

    list_filter = ("name", "ceo_name", "phone", "address")
    list_display = ("name", "ceo_name", "phone", "address")


admin.site.register(User, UserAdmin)
admin.site.register(Studio, StudioClass)
admin.site.unregister(Group)
