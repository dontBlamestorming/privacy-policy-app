from django.contrib import admin
from .models import *
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import (
    UserChangeForm,
    UserCreationForm,
    StudioCreationForm,
    StudioChangeForm,
)


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ("email", "name", "studio", "is_studio_manager", "is_studio_member")

    fieldsets = (
        (None, {"fields": ("email", "name", "password", "studio")}),
        (
            "Permissions",
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
                "fields": ("email", "password1", "password2", "name", "studio"),
            },
        ),
    )

    search_fields = ("email", "name", "studio", "is_studio_manager", "is_studio_member")
    ordering = ("studio",)
    filter_horizontal = ()


class StudioClass(admin.ModelAdmin):
    form = StudioChangeForm
    add_form = StudioCreationForm

    list_filter = ("name", "ceo_name", "phone", "address")
    list_display = ("name", "ceo_name", "phone", "address")


admin.site.register(User, UserAdmin)
admin.site.register(Studio, StudioClass)

admin.site.unregister(Group)
