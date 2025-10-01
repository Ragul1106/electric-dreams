# services/admin.py
from django.contrib import admin
from .models import Section, Service, ContactMessage

class ServiceInline(admin.TabularInline):
    model = Service
    extra = 0

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    inlines = [ServiceInline]

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "order")

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "created_at")
