from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from .serializers import ContactMessageSerializer

class ContactMessageCreateView(APIView):
    """
    POST endpoint to create ContactMessage, send emails:
    - Notify admin (from user's email; reply_to user's email)
    - Acknowledge user
    """
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()

            # prepare admin notification email
            admin_subject = f"New contact message from {obj.first_name} {obj.last_name}"
            admin_body = (
                f"New message received:\n\n"
                f"Name: {obj.first_name} {obj.last_name}\n"
                f"Email: {obj.email}\n"
                f"Phone: {obj.phone}\n"
                f"Address: {obj.address}\n\n"
                f"Message:\n{obj.message}\n\n"
                f"Received at: {obj.created_at}\n"
            )

            try:
                # send to admin; set reply_to so admin can reply directly to user
                email_to_admin = EmailMessage(
                    subject=admin_subject,
                    body=admin_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[settings.ADMIN_EMAIL],
                    reply_to=[obj.email],
                )
                email_to_admin.send(fail_silently=False)
            except Exception as e:
                # Log / handle in production. Return partial success if needed.
                return Response(
                    {"detail": "Saved but failed to send admin email", "error": str(e)},
                    status=status.HTTP_201_CREATED
                )

            # send acknowledgement to user
            ack_subject = "We received your message"
            ack_body = (
                f"Hi {obj.first_name},\n\n"
                "Thanks for reaching out. We have received your message and will reply shortly.\n\n"
                "Your message:\n"
                f"{obj.message}\n\n"
                "Regards,\nSupport Team"
            )
            try:
                send_mail(
                    subject=ack_subject,
                    message=ack_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[obj.email],
                    fail_silently=False,
                )
            except Exception:
                # don't fail the whole request if ack mail fails
                pass

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
