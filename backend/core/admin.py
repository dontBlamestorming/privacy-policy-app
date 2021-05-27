from django.contrib import admin
from .models import PrivacyPolicyForm, Image


class UserAdminClass(admin.ModelAdmin):
    model = PrivacyPolicyForm
    list_filter = ("receiver", "name", "email", "birthday", "gender", "phone", "sign")
    list_display = ("receiver", "name", "email", "birthday", "gender", "phone", "sign")

    # fieldsets = (
    #     (None, {'fields': ("email", "user_name", "studio_name")}),
    #     ('Permissions', {'fields': ('is_staff', 'is_active')}),
    # )


class ImagesClass(admin.ModelAdmin):
    model = Image
    list_filter = ("form", "file")
    list_display = ("form", "file")


admin.site.register(PrivacyPolicyForm, UserAdminClass)
admin.site.register(Image, ImagesClass)
