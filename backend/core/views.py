from django.http import FileResponse
from os import name
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
)
from rest_framework.response import Response

from .models import PrivacyPolicyForm, Image
from .serializers import (
    FormFilesSerializer,
    FormSerializer,
    CreateImageSerializer,
    ImageViewSerailizer,
)
from .permissions import IsStudioManager


class FormViewSet(
    ListModelMixin,
    CreateModelMixin,
    viewsets.GenericViewSet,
):
    """개인정보이용동의서 생성 및 Lists 불러오기"""

    queryset = PrivacyPolicyForm.objects.all()
    serializer_class = FormSerializer

    def get_permissions(self):
        if self.action == "list":
            permission_classes = [
                IsStudioManager,
            ]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return PrivacyPolicyForm.objects.filter(studio=self.request.user.studio)


class FormImageView(
    CreateModelMixin,
    DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """PSD files 조회 및 생성 및 삭제"""

    queryset = Image.objects.all()
    serializer_class = CreateImageSerializer
    permission_classes = [IsStudioManager]

    def filter_queryset(self, queryset):
        form_pk = self.request.query_params.get("form")

        if form_pk is not None:
            queryset = queryset.filter(form=form_pk)
        return queryset

    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(form_id=pk)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ImageView(viewsets.GenericViewSet):
    """PSD file 다운로드"""

    queryset = Image.objects.all()
    serializer_class = ImageViewSerailizer
    permission_classes = [IsStudioManager]

    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(id=pk)
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, content_type="image/*")
