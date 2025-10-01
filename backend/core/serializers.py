from rest_framework import serializers
from .models import HomeHeroBanner, HomeStatsSection, StatItem

from .models import HomeStepsSection
from .models import HomeReviewsSection, Review
from .models import HomeBrandsSection, BrandLogo
from .models import HomeFAQSection, FAQItem
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "title", "subtitle", "image", "order", "created_at"]

class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQItem
        fields = ["id", "question", "answer"]

class HomeFAQSectionSerializer(serializers.ModelSerializer):
    faqs = FAQItemSerializer(many=True, read_only=True)

    class Meta:
        model = HomeFAQSection
        fields = ["id", "heading", "subheading", "faqs"]


class BrandLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandLogo
        fields = ["id", "image", "name"]

class HomeBrandsSectionSerializer(serializers.ModelSerializer):
    logos = BrandLogoSerializer(many=True, read_only=True)

    class Meta:
        model = HomeBrandsSection
        fields = ["id", "heading", "cta_text", "phone_number", "logos"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "stars", "text", "person_image", "person_name", "service"]

class HomeReviewsSectionSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = HomeReviewsSection
        fields = ["id", "heading", "subheading", "created_at", "reviews"]




class HomeStepsSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeStepsSection
        fields = [
            "id",
            "heading",
            "step1_number",
            "step1_title",
            "step1_description",
            "step2_number",
            "step2_title",
            "step2_description",
            "step3_number",
            "step3_title",
            "step3_description",
            "created_at",
        ]



class StatItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatItem
        fields = ["id", "value", "title", "description"]

class HomeStatsSectionSerializer(serializers.ModelSerializer):
    stats = StatItemSerializer(many=True, read_only=True)

    class Meta:
        model = HomeStatsSection
        fields = ["id", "heading", "title", "image1", "image2", "image3", "image4", "stats"]

class HomeHeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeHeroBanner
        fields = ["id", "bg_img", "hero_img", "hero_title", "hero_subtitle"]

