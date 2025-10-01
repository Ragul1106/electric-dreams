from rest_framework import generics, status
from rest_framework.response import Response
from .models import CartItem
from .serializers import CartItemSerializer
from serviceDetail.models import Service


# ✅ List all cart items / Create new cart item
class CartListCreateView(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer

    def get_queryset(self):
        # If logged in → filter by user
        if self.request.user.is_authenticated:
            return CartItem.objects.filter(user=self.request.user)
        # Guest user → return all guest cart items
        return CartItem.objects.filter(user=None)

    def create(self, request, *args, **kwargs):
        service_id = request.data.get("service_id")
        quantity = int(request.data.get("quantity", 1))

        try:
            service = Service.objects.get(id=service_id)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(
            service=service,
            user=request.user if request.user.is_authenticated else None
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

# ✅ Update/Delete single cart item
class CartItemUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer
    lookup_field = "id"

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return CartItem.objects.filter(user=self.request.user)
        return CartItem.objects.filter(user=None)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True  
        return super().update(request, *args, **kwargs)
