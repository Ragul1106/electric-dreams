from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import HomeHeroBanner
from .serializers import HomeHeroBannerSerializer
from .models import HomeStatsSection
from .serializers import HomeStatsSectionSerializer
from .models import HomeStepsSection
from .serializers import HomeStepsSectionSerializer
from .models import HomeStepsSection
from .serializers import HomeStepsSectionSerializer
from rest_framework.permissions import AllowAny

from .models import HomeReviewsSection, Review
from .serializers import (
    HomeReviewsSectionSerializer,
    ReviewSerializer,
)
from .models import HomeBrandsSection
from .serializers import HomeBrandsSectionSerializer
from .models import HomeFAQSection
from .serializers import HomeFAQSectionSerializer
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all().order_by("order", "-created_at")
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    
class HomeFAQSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeFAQSection.objects.all().order_by("-created_at")
    serializer_class = HomeFAQSectionSerializer
    permission_classes = [AllowAny]


class HomeBrandsSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeBrandsSection.objects.all().order_by("-created_at")
    serializer_class = HomeBrandsSectionSerializer
    permission_classes = [AllowAny]


class HomeReviewsSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only viewset for the reviews section (includes nested reviews).
    GET /api/home/reviews/
    GET /api/home/reviews/{id}/
    """
    queryset = HomeReviewsSection.objects.all().order_by("-created_at")
    serializer_class = HomeReviewsSectionSerializer
    permission_classes = [AllowAny]


class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Optional read-only viewset for individual reviews.
    GET /api/reviews/
    GET /api/reviews/{id}/
    """
    queryset = Review.objects.all().order_by("id")
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

class HomeStepsSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only ViewSet. List returns all sections (usually one) and retrieve by id.
    """
    queryset = HomeStepsSection.objects.all().order_by("-created_at")
    serializer_class = HomeStepsSectionSerializer



class HomeStatsSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeStatsSection.objects.all().order_by("-created_at")
    serializer_class = HomeStatsSectionSerializer


class HomeHeroBannerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides list and retrieve actions for HomeHeroBanner.
    /api/home/hero/        -> list (usually only one, but can have multiple)
    /api/home/hero/{id}/   -> retrieve single banner
    """
    queryset = HomeHeroBanner.objects.all().order_by("-created_at")
    serializer_class = HomeHeroBannerSerializer

