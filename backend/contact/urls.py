from django.urls import path
from .views import ContactMessageCreateView

urlpatterns = [
    path("messages/", ContactMessageCreateView.as_view(), name="contact-messages"),
]
