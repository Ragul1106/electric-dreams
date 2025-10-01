from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import HomeHeroBannerViewSet
from .views import HomeStatsSectionViewSet
from .views import HomeStepsSectionViewSet
from .views import HomeReviewsSectionViewSet
from .views import HomeBrandsSectionViewSet
from .views import HomeFAQSectionViewSet
from .views import ServiceViewSet

router = DefaultRouter()
router.register("home/hero", HomeHeroBannerViewSet, basename="home-hero")
router.register("home/stats", HomeStatsSectionViewSet, basename="home-stats")
router.register("home/steps", HomeStepsSectionViewSet, basename="home-steps")
router.register("home/reviews", HomeReviewsSectionViewSet, basename="home-reviews")
router.register("home/brands", HomeBrandsSectionViewSet, basename="home-brands")
router.register("home/faqs", HomeFAQSectionViewSet, basename="home-faqs")
router.register("home/services", ServiceViewSet, basename="home-service")


urlpatterns = [
    path('', include(router.urls)),
    
]
