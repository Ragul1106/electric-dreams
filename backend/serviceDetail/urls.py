from django.urls import path
from .views import ServiceListView, ServiceDetailView, FAQListView, ReviewListView

urlpatterns = [
    path("servicesdetail/", ServiceListView.as_view(), name="service-detail"),
    path("servicesinfo/<int:id>/", ServiceDetailView.as_view(), name="service-info"),
    path("faqs/", FAQListView.as_view(), name="faq-list"),
    path("reviews/", ReviewListView.as_view(), name="review-list"),
]
