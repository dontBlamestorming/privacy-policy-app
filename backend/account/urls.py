from django.urls import path, include
from .views import LoginView, ProfileView
from . import views


# api/account/

urlpatterns = [
    path("api-auth", include("rest_framework.urls")),
    path("login/", LoginView.as_view(), name="login"),
    # path("profile/", views.profile),
    path("profile/", ProfileView.as_view(), name="profile")
]
