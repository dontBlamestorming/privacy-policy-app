from rest_framework import routers
from . import views

router = routers.SimpleRouter()

router.register(r"", views.FormViewSet)
router.register(r"image", views.FormImageView)
router.register(r"download", views.ImageView)

urlpatterns = router.urls
