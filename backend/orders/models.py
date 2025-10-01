from django.db import models
from cart.models import CartItem


class Order(models.Model):
    cart_item = models.ForeignKey(
        CartItem, on_delete=models.SET_NULL, null=True, blank=True
    )

    # snapshot fields (copied from cart item & service at checkout)
    service_title = models.CharField(max_length=255)
    service_price = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=1)

    # customer details
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    service_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.first_name} {self.last_name}"
