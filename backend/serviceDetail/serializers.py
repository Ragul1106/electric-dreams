from rest_framework import serializers
from .models import Service, FAQ, Review


# ------------------------
# FAQ & Review serializers
# ------------------------
class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "stars", "text", "author", "service_name", "image"]


# ------------------------
# Service List (basic info)
# ------------------------
class ServiceListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ["id", "title", "price", "duration", "rating", "reviews_count", "offer", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return request.build_absolute_uri(obj.image.url)
        return None

# ------------------------
# Service Detail (with FAQs + Reviews)
# ------------------------
class ServiceDetailSerializer(serializers.ModelSerializer):
    faqs = FAQSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            "id", "title", "image", "rating", "reviews_count",
            "price", "duration", "offer", "faqs", "reviews"
        ]
