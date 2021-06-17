from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from .models import PrivacyPolicyForm, Image
from .permissions import IsStudioManager
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
)
from .serializers import (
    FormCreateSerializer,
    FormListSerializer,
    FormDetailSerializer,
    CreateImageSerializer,
    ImageViewSerailizer,
)


class FormViewSet(
    ListModelMixin,
    CreateModelMixin,
    RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """개인정보이용동의서 List(생성, 조회) && Detail(조회)"""

    queryset = PrivacyPolicyForm.objects.all()
    serializer_class = FormListSerializer

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

    def get_serializer_class(self):
        if self.action == "retrieve":
            return FormDetailSerializer

        if self.action == "create":
            return FormCreateSerializer

        return super().get_serializer_class()


class FormImageView(
    CreateModelMixin,
    DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """PSD file 조회 및 생성 및 삭제"""

    queryset = Image.objects.all()
    serializer_class = CreateImageSerializer
    permission_classes = [IsStudioManager]
    parser_classes = (
        MultiPartParser,
        FormParser,
        JSONParser,
    )

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

        return Response(
            serializer.data,
            content_type=("image/*"),
        )
