from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import random

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, unique=True, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.phone})"

class OTP(models.Model):
    identifier = models.CharField(max_length=255)  
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)

    def is_valid(self):
        return (not self.used) and (self.expires_at > timezone.now())

    def __str__(self):
        return f"{self.identifier} - {self.code}"