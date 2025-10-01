from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="services/")
    rating = models.FloatField(default=0)
    reviews_count = models.IntegerField(default=0)
    price = models.CharField(max_length=100)
    duration = models.CharField(max_length=100, blank=True, null=True)
    offer = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.title

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.question


# ✅ Global Review (not tied to a service anymore)
class Review(models.Model):
    stars = models.IntegerField(default=5)
    text = models.TextField()
    author = models.CharField(max_length=100)
    service_name = models.CharField(max_length=200)  # optional, just text
    image = models.ImageField(upload_to="reviews/", blank=True, null=True)

    def __str__(self):
        return f"{self.author} ({self.stars}⭐)"