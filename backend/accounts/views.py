from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import timedelta
from django.contrib.auth import authenticate
from .serializers import SendOTPSerializer, VerifyOTPSerializer
from .models import OTP, UserProfile
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
import random
from .serializers import LoginSerializer

class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        # authenticate expects username, so map email to username if needed
        user = authenticate(request, username=email, password=password)
        
        if not user:
            return Response({"detail": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user.username,
        })

def _generate_code(n=4):
    return "".join(str(random.randint(0, 9)) for _ in range(n))

from django.contrib.auth.hashers import make_password

class RegisterView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(email=email).exists():
            return Response(
                {"detail": "User already exists. Please login."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create(
            username=email,   
            email=email,
            password=make_password(password)
        )
        UserProfile.objects.create(user=user, phone=email)

        code = _generate_code(4)
        now = timezone.now()
        OTP.objects.create(
            identifier=email,
            code=code,
            expires_at=now + timedelta(minutes=5)
        )

        subject = "Your Registration OTP"
        message = f"Your OTP code is {code}. It expires in 5 minutes."
        send_mail(subject, message, "rockyranjith1121@gmail.com", [email])

        return Response({"detail": "OTP sent for registration"}, status=status.HTTP_200_OK)

class SendOTPView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        identifier = serializer.validated_data["identifier"].strip()
        code = _generate_code(4)

        # Check if user exists
        if not User.objects.filter(email=identifier).exists():
            return Response(
                {"detail": "User not registered. Please sign up first."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        now = timezone.now()
        OTP.objects.create(
            identifier=identifier,
            code=code,
            expires_at=now + timedelta(minutes=5)
        )

        subject = "Your Login OTP"
        message = f"Your OTP code is {code}. It expires in 5 minutes."
        send_mail(subject, message, "rockyranjith1121@gmail.com", [identifier])

        return Response({"detail": "OTP sent"}, status=status.HTTP_200_OK)




class VerifyOTPView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        identifier = serializer.validated_data["identifier"].strip()
        code = serializer.validated_data["code"].strip()

        otp = OTP.objects.filter(identifier=identifier, code=code, used=False).order_by("-created_at").first()
        if otp is None or not otp.is_valid():
            return Response({"detail": "Invalid or expired code"}, status=status.HTTP_400_BAD_REQUEST)

        otp.used = True
        otp.save()

        # Get or create user
        profile = UserProfile.objects.filter(phone=identifier).first()
        if profile:
            user = profile.user
        else:
            user = User.objects.create(username=identifier, email=identifier if "@" in identifier else "")
            UserProfile.objects.create(user=user, phone=identifier)

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user.username,
        }, status=status.HTTP_200_OK)
