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
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.conf import settings
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
import logging
from .models import CallbackSection1
from .serializers import CallbackSection1Serializer
from .models import CallbackSection2
from .serializers import CallbackSection2Serializer

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


logger = logging.getLogger(__name__)


class CallbackSection1ViewSet(viewsets.ModelViewSet):
    """
    Read/write viewset for CallbackSection1. For frontend we expose list() to return the first (and only) HomePage instance.
    """
    queryset = CallbackSection1.objects.all()
    serializer_class = CallbackSection1Serializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        obj = CallbackSection1.objects.first()
        if not obj:
            obj = CallbackSection1.objects.create(
                feature_cards=[
                    {"title": "Lifetime Workmanship Warranty", "subtitle": "", "icon_index": 0},
                    {"title": "Money Back Guarantee", "subtitle": "", "icon_index": 1},
                    {"title": "24/7 Emergency Service", "subtitle": "", "icon_index": 2},
                    {"title": "190+ 5-Star Customer Reviews", "subtitle": "", "icon_index": 3},
                    {"title": "Awarded For Service Excellence", "subtitle": "", "icon_index": 4},
                ]
            )
            logger.info("Created default CallbackSection1 instance")
        serializer = self.get_serializer(obj, context={"request": request})
        return Response(serializer.data)
    


logger = logging.getLogger(__name__)

class CallbackSection2ViewSet(viewsets.ModelViewSet):
    queryset = CallbackSection2.objects.all()
    serializer_class = CallbackSection2Serializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        obj = CallbackSection2.objects.first()
        if not obj:
            obj = CallbackSection2.objects.create(
                paragraphs=[
                    "At electrical dreams, we understand that electrical emergencies can happen at any time. Whether it's a power outage, faulty wiring, sparking outlets, or an electrical hazard, our emergency electricians are ready to respond quickly to restore safety and functionality to your home or business.",
                    "When you call us for an emergency electrical service, our licensed electricians will promptly assess the situation, identify the cause, and provide fast, effective repairs. We follow Australian safety standards and use high-quality equipment to resolve issues safely, preventing further risks or damage.",
                    "Our lifetime workmanship warranty reflects our confidence in the reliability of our services. If you encounter electrical problems related to our repairs, we will be there to resolve them efficiently and professionally. Your safety is our top priority.",
                    "Choose Adelaide Urban Electrical for reliable emergency electrical services and get the help you need—day or night. With our expert team, you can have peace of mind knowing your electrical issues will be resolved quickly and safely.",
                ]
            )
            logger.info("Created default CallbackSection2 instance")
        serializer = self.get_serializer(obj, context={"request": request})
        return Response(serializer.data)


from .models import CallbackSection3
from .serializers import CallbackSection3Serializer

logger = logging.getLogger(__name__)

class CallbackSection3ViewSet(viewsets.ModelViewSet):
    queryset = CallbackSection3.objects.all()
    serializer_class = CallbackSection3Serializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        obj = CallbackSection3.objects.first()
        if not obj:
            obj = CallbackSection3.objects.create(
                points=[
                    "Smoke coming out of your outlets — Smoke from power outlets can signify that the wiring in your home or business is faulty and needs to be replaced. If you don’t have an after-hours electrician on hand to inspect the problem, it could cause a fire. If you see smoke or hear crackling sounds from an outlet, turn off the power at the breaker box and call an expert.",
                    "Smell of burning electronics — When you suddenly smell burning electronics, something might be wrong with your electrical system. If the smell is strong and seems to be coming from more than one device in your home, it’s time to call an emergency electrician.",
                    "Sudden isolated loss of power — If there is a sudden loss of power over a small area or within one room of your home, this could be due to a short circuit or blown fuse, or it could result from faulty wiring that needs to be repaired immediately.",
                    "Circuit breaker keeps tripping or resetting — Circuit breakers are supposed to trip when they sense too much current, but if they trip too often, there might be something wrong with the wiring, or your breaker may be faulty."
                ]
            )
            logger.info("Created default CallbackSection3 instance")
        serializer = self.get_serializer(obj, context={"request": request})
        return Response(serializer.data)