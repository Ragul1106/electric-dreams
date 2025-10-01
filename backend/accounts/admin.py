from django.contrib import admin
from .models import UserProfile, OTP

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "phone")  

@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ("identifier", "code", "created_at", "expires_at", "used")
