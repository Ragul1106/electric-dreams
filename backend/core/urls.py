from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import HomeHeroBannerViewSet
from .views import HomeStatsSectionViewSet
from .views import HomeStepsSectionViewSet
from .views import HomeReviewsSectionViewSet
from .views import HomeBrandsSectionViewSet
from .views import HomeFAQSectionViewSet
from .views import ServiceViewSet
from .views import CallbackSection1ViewSet, CallbackSection2ViewSet, CallbackSection3ViewSet

router = DefaultRouter()
router.register("home/hero", HomeHeroBannerViewSet, basename="home-hero")
router.register("home/stats", HomeStatsSectionViewSet, basename="home-stats")
router.register("home/steps", HomeStepsSectionViewSet, basename="home-steps")
router.register("home/reviews", HomeReviewsSectionViewSet, basename="home-reviews")
router.register("home/brands", HomeBrandsSectionViewSet, basename="home-brands")
router.register("home/faqs", HomeFAQSectionViewSet, basename="home-faqs")
router.register("home/services", ServiceViewSet, basename="home-service")
router.register("callback/section1", CallbackSection1ViewSet, basename="callback-section1")
router.register("callback/section2", CallbackSection2ViewSet, basename="callback-section2")
router.register("callback/section3", CallbackSection3ViewSet, basename="callback-section3")


urlpatterns = [
    path('', include(router.urls)),
    
]
