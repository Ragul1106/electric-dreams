from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "service_title",
        "service_price",
        "quantity",
        "first_name",
        "last_name",
        "email",
        "phone",
        "service_date",
        "created_at",
    )
    list_filter = ("service_date", "created_at")
    search_fields = ("first_name", "last_name", "email", "phone", "service_title")
