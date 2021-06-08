from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

# from rest_framework.permissions import AllowAny
from .models import User, Studio

from .serializers import AuthTokenSerializer


class LoginView(ObtainAuthToken):
    permission_classes = []  
    # permission_classes = [AllowAny]
    serializer_class = AuthTokenSerializer


# @api_view(http_method_names=["GET"])
# def profile(request):
#     return Response(
#         {
#             "email": request.user.email,
#             "name": request.user.name,
#             "studio": request.user.studio,
#             "is_studio_manager": request.user.is_studio_manager
#         }
#     )


class ProfileView(APIView):  # serializer로 바꾸는게 좋다
    def get(self, request):  # 이 request는 어디서 오는거지? front에서 쏘는게 아닌가?
        return Response(
            {
                "id": request.user.id,
                "name": request.user.name,
                "studio_id": request.user.studio_id,
                "studio": request.user.studio.name if request.user.studio else "",
                "is_studio_manager": request.user.is_studio_manager,
                "is_studio_staff": request.user.is_studio_staff,
            }
        )
