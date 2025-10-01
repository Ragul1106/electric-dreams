from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

from .models import Section, Service, ContactMessage
from .serializers import SectionSerializer, ServiceSerializer, ContactMessageSerializer


class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.prefetch_related("services").all().order_by("id")
    serializer_class = SectionSerializer
    permission_classes = [permissions.AllowAny]


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all().order_by("order")
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by("-created_at")
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Save message to DB
        contact_message = serializer.save()

        # Email details
        admin_email = settings.DEFAULT_FROM_EMAIL  # make sure it's configured
        user_email = contact_message.email

        # Send email to admin
        send_mail(
            subject=f"New Service Request from {contact_message.name}",
            message=f"""
                    A new service request has been submitted:

                    Name: {contact_message.name}
                    Email: {contact_message.email}
                    Phone: {contact_message.phone}
                    Address: {contact_message.address}
                    Message: {contact_message.message}
                    """,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[admin_email],
                    fail_silently=True,
                 )

        # Send confirmation email to user (if provided)
        if user_email:
            send_mail(
                subject="We received your service request",
                message=f"Hello {contact_message.name},\n\nThank you for contacting us. Our team will get back to you soon.\n\nYour message:\n{contact_message.message}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user_email],
                fail_silently=True,
            )

        return contact_message
