from django.db import models

class Section(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True)
    image = models.ImageField(upload_to="section_images/", null=True, blank=True)
    contact_phone = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.title

class Service(models.Model):
    section = models.ForeignKey(Section, related_name="services", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    excerpt = models.TextField(blank=True)
    image = models.ImageField(upload_to="service_images/", null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.created_at}"
