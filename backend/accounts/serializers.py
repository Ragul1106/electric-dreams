# backend/accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import OTP, UserProfile


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class SendOTPSerializer(serializers.Serializer):
    identifier = serializers.CharField()


class VerifyOTPSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    code = serializers.CharField(max_length=6)

