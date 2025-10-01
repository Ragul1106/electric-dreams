from django.urls import path
from .views import CartListCreateView, CartItemUpdateDeleteView

urlpatterns = [
    path("cart/", CartListCreateView.as_view(), name="cart-list-create"),
    path("cart/<int:id>/", CartItemUpdateDeleteView.as_view(), name="cart-item-update-delete"),
]
