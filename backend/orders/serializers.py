from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "cart_item",
            "service_title",
            "service_price",
            "quantity",
            "first_name",
            "last_name",
            "email",
            "phone",
            "address",
            "service_date",
            "created_at",
        ]
        read_only_fields = ["id", "created_at", "service_title", "service_price", "quantity"]
