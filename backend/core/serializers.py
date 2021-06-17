import pytz
from django.db import models
from django.utils import timezone
from rest_framework import serializers
from .models import Image, PrivacyPolicyForm


class FormFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "file"]


class FormCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicyForm
        fields = "__all__"


class FormListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicyForm
        fields = ["id", "name", "email", "phone", "gender", "created"]


class FormDetailSerializer(serializers.ModelSerializer):
    files = FormFilesSerializer(source="image_set.all", many=True, required=False)

    class Meta:
        model = PrivacyPolicyForm
        fields = ["id", "name", "email", "phone", "gender", "birthday", "files"]


class CreateImageSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Image
        fields = "__all__"
        extra_kwargs = {"file": {"required": True}}

    def validate(self, attrs):
        super().validate(attrs)
        user = attrs.get("user")
        form = attrs.get("form")

        if form.studio != user.studio:
            raise serializers.ValidationError("Invalid Studio")

        return attrs


class ImageViewSerailizer(serializers.ModelSerializer):
    file = serializers.FileField()

    class Meta:
        model = Image
        fields = ["id", "file"]
