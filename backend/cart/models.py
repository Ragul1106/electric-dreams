from django.db import models
from django.contrib.auth.models import User
from serviceDetail.models import Service


class CartItem(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,                  
        related_name="cart_items"
    )
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def total_price(self):
        try:
            digits = "".join(c for c in self.service.price if c.isdigit())
            return int(digits) * self.quantity if digits else 0
        except Exception:
            return 0

    def __str__(self):
        return f"{self.service.title} (x{self.quantity})"
