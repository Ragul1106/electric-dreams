from django.contrib import admin
from .models import Service, FAQ, Review


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "rating", "reviews_count", "price", "duration", "offer")
    search_fields = ("title", "price", "offer")
    list_filter = ("rating",)


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("id", "question")   
    search_fields = ("question", "answer")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "stars", "service_name")  
    search_fields = ("author", "text", "service_name")
    list_filter = ("stars",)  
