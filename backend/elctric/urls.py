from rest_framework.routers import DefaultRouter
from .views import SectionViewSet, ServiceViewSet, ContactMessageViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r"sections", SectionViewSet, basename="section")
router.register(r"services", ServiceViewSet, basename="service")
router.register(r"contacts", ContactMessageViewSet, basename="contact")

urlpatterns = [
    path("", include(router.urls)),
]
