from rest_framework import generics
from .models import Order
from .serializers import OrderSerializer
from cart.models import CartItem


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def perform_create(self, serializer):
        print("Incoming data:", self.request.data)
        order = serializer.save()

        if order.cart_item:
            cart_item = order.cart_item

            # snapshot cart/service details
            order.service_title = cart_item.service.title
            order.service_price = cart_item.service.price
            order.quantity = cart_item.quantity
            order.save()

            # clear cart after snapshot
            cart_item.delete()

        return order
