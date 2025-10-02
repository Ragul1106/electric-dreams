from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import timedelta
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import random

from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    SendOTPSerializer,
    VerifyOTPSerializer,
)
from .models import OTP, UserProfile

# ✅ OTP generator
def _generate_code(n=4):
    return "".join(str(random.randint(0, 9)) for _ in range(n))

# ✅ Check if identifier is email or phone
def _is_email(identifier):
    return '@' in identifier

# ✅ Email/Password Login
class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"detail": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # authenticate by username=email (since we save username=email)
        user = authenticate(request, username=email, password=password)
        if not user:
            return Response(
                {"detail": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
            }
        )

# ✅ Register new user with email & password
class RegisterView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"detail": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if user exists by email
        if User.objects.filter(email=email).exists():
            return Response(
                {"detail": "User with this email already exists. Please login."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if username exists
        if User.objects.filter(username=email).exists():
            return Response(
                {"detail": "User already exists. Please login."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # create user
            user = User.objects.create(
                username=email,
                email=email,
                password=make_password(password),
            )
            UserProfile.objects.create(user=user)

            # generate OTP
            code = _generate_code(4)
            now = timezone.now()
            OTP.objects.create(
                identifier=email, code=code, expires_at=now + timedelta(minutes=5)
            )

            # send OTP to email
            subject = "Your Registration OTP"
            message = f"Your OTP code is {code}. It expires in 5 minutes."
            send_mail(subject, message, settings.EMAIL_HOST_USER, [email])

            return Response(
                {"detail": "User registered successfully. OTP sent to your email."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"detail": f"Registration failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

# ✅ Send OTP for Login
class SendOTPView(APIView):
    permission_classes = []

    def post(self, request):
        identifier = request.data.get("identifier", "").strip()
        
        if not identifier:
            return Response(
                {"detail": "Identifier (email/phone) is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # For email identifiers, check if user exists
        if _is_email(identifier):
            if not User.objects.filter(email=identifier).exists():
                return Response(
                    {"detail": "User not registered. Please sign up first."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        # For phone numbers, check UserProfile
        else:
            if not UserProfile.objects.filter(phone=identifier).exists():
                return Response(
                    {"detail": "User not registered. Please sign up first."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Generate and save OTP
        code = _generate_code(4)
        now = timezone.now()
        OTP.objects.create(
            identifier=identifier, code=code, expires_at=now + timedelta(minutes=5)
        )

        # Send OTP via email if it's an email
        if _is_email(identifier):
            subject = "Your Login OTP"
            message = f"Your OTP code is {code}. It expires in 5 minutes."
            try:
                send_mail(subject, message, settings.EMAIL_HOST_USER, [identifier])
            except Exception as e:
                return Response(
                    {"detail": f"Failed to send OTP: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return Response(
            {"detail": "OTP sent successfully"}, 
            status=status.HTTP_200_OK
        )

# ✅ Verify OTP for Login/Register
class VerifyOTPView(APIView):
    permission_classes = []

    def post(self, request):
        identifier = request.data.get("identifier", "").strip()
        code = request.data.get("code", "").strip()

        if not identifier or not code:
            return Response(
                {"detail": "Identifier and code are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Find valid OTP
        otp = (
            OTP.objects.filter(identifier=identifier, code=code, used=False)
            .order_by("-created_at")
            .first()
        )
        
        if otp is None or not otp.is_valid():
            return Response(
                {"detail": "Invalid or expired code"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Mark OTP as used
        otp.used = True
        otp.save()

        # Find user by email or phone
        user = None
        if _is_email(identifier):
            try:
                user = User.objects.get(email=identifier)
            except User.DoesNotExist:
                return Response(
                    {"detail": "User not found. Please register first."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            try:
                profile = UserProfile.objects.get(phone=identifier)
                user = profile.user
            except UserProfile.DoesNotExist:
                return Response(
                    {"detail": "User not found. Please register first."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if not user:
            return Response(
                {"detail": "User not found. Please register first."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
            },
            status=status.HTTP_200_OK,
        )