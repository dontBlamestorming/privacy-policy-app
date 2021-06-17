from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response


from .serializers import AuthTokenSerializer


class LoginView(ObtainAuthToken):
    permission_classes = []
    serializer_class = AuthTokenSerializer


class ProfileView(APIView):
    def get(self, request):
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
