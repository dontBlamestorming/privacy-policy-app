from django.db.models import fields
from django.core.validators import URLValidator
from django.core.files.base import ContentFile
from rest_framework import serializers
from .models import Image, PrivacyPolicyForm


# class FileUrlField(serializers.FileField):
#     def to_internal_value(self, data):
#         try:
#             URLValidator()(data)
#         except ValidationError as e:
#             raise ValidationError("Invalid Url")

#         # download the contents from the URL
#         file, http_message = urlretrieve(data)
#         file = File(open(file, "rb"))
#         return super(FileUrlField, self).to_internal_value(
#             ContentFile(file.read(), name=file.name)
#         )


class FormFilesSerializer(serializers.ModelSerializer):
    # file = FileUrlField()

    class Meta:
        model = Image
        fields = ["id", "file"]


class FormSerializer(serializers.ModelSerializer):
    files = FormFilesSerializer(source="image_set.all", many=True)

    class Meta:
        model = PrivacyPolicyForm
        fields = "__all__"


class CreateImageSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Image
        fields = "__all__"
        extra_kwargs = {"file": {"required": True}}  # file 없을경우 !

    def validate(self, attrs):
        super().validate(attrs)
        user = attrs.get("user")
        form = attrs.get("form")

        if form.studio != user.studio:  # form의 studio가 user의 소속과 일치하지 않으면?
            raise serializers.ValidationError("Invalid Studio")  # api error 메세지

        return attrs


class ImageViewSerailizer(serializers.ModelSerializer):
    file = serializers.FileField()

    class Meta:
        model = Image
        fields = ["id", "file"]
