from django.contrib import admin
from django.utils.html import format_html
from .models import HomeStatsSection, StatItem, HomeHeroBanner
from django.contrib import admin
from .models import HomeStepsSection
from django.contrib import admin
from django.utils.html import format_html
from .models import HomeReviewsSection
from .models import HomeReviewsSection, Review
from .models import HomeBrandsSection, BrandLogo
from .models import HomeFAQSection, FAQItem
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "created_at")
    list_editable = ("order",)
    search_fields = ("title", )

class FAQItemInline(admin.TabularInline):
    model = FAQItem
    extra = 1
    fields = ("question", "answer")
    show_change_link = False

@admin.register(HomeFAQSection)
class HomeFAQSectionAdmin(admin.ModelAdmin):
    list_display = ("heading", "created_at")
    inlines = [FAQItemInline]
    fieldsets = (
        (None, {"fields": ("heading", "subheading")}),
    )


class BrandLogoInline(admin.TabularInline):
    model = BrandLogo
    extra = 1
    fields = ("preview", "image", "name")
    readonly_fields = ("preview",)
    # do not show change link for a separate model view (managed inline only)
    show_change_link = False

    def preview(self, obj):
        if obj and obj.image:
            return format_html(
                '<img src="{}" style="height:40px; object-fit:contain; border-radius:4px;" />',
                obj.image.url
            )
        return format_html('<div style="width:120px;height:40px;background:#f3f4f6;border-radius:4px;"></div>')
    preview.short_description = "Logo preview"


@admin.register(HomeBrandsSection)
class HomeBrandsSectionAdmin(admin.ModelAdmin):
    list_display = ("heading", "phone_number", "created_at")
    inlines = [BrandLogoInline]
    fieldsets = (
        (None, {
            "fields": ("heading", "cta_text", "phone_number"),
        }),
    )
    search_fields = ("heading", "cta_text")
    ordering = ("-created_at",)

# IMPORTANT: Do NOT register BrandLogo as a separate admin model.
# If previously registered, ensure you remove or comment out that registration.
# e.g.
# from .models import BrandLogo
# admin.site.unregister(BrandLogo)  # only if previously registered


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1  # show 1 empty row by default
    min_num = 1
    fields = ("stars", "text", "person_image", "person_name", "service")
    show_change_link = True

@admin.register(HomeReviewsSection)
class HomeReviewsSectionAdmin(admin.ModelAdmin):
    list_display = ("heading", "created_at")
    inlines = [ReviewInline]
    fieldsets = (
        (None, {"fields": ("heading", "subheading")}),
    )



@admin.register(HomeStepsSection)
class HomeStepsSectionAdmin(admin.ModelAdmin):
    list_display = ("heading", "created_at")
    fieldsets = (
        (None, {"fields": ("heading",)}),
        ("Step 1", {"fields": ("step1_number", "step1_title", "step1_description")}),
        ("Step 2", {"fields": ("step2_number", "step2_title", "step2_description")}),
        ("Step 3", {"fields": ("step3_number", "step3_title", "step3_description")}),
    )
    ordering = ("-created_at",)



# Inline for StatItem under HomeStatsSection
class StatItemInline(admin.TabularInline):
    model = StatItem
    extra = 4  # show 4 empty rows by default
    min_num = 1
    max_num = 8
    fields = ("value", "title", "description")
    show_change_link = True


@admin.register(HomeStatsSection)
class HomeStatsSectionAdmin(admin.ModelAdmin):
    list_display = ("heading", "title", "created_at", "preview_images")  # include heading
    readonly_fields = ("preview_images",)
    inlines = [StatItemInline]
    fieldsets = (
        (None, {
            "fields": ("heading", "title")  # Heading + optional subtitle
        }),
        ("Images (2x2 grid)", {
            "fields": ("image1", "image2", "image3", "image4", "preview_images"),
        }),
    )
    search_fields = ("heading", "title")
    ordering = ("-created_at",)

    def preview_images(self, obj):
        """
        Returns a small 2x2 preview of the images (or placeholders).
        """
        if not obj:
            return ""
        imgs = []
        for img in (obj.image1, obj.image2, obj.image3, obj.image4):
            if img:
                imgs.append(f'<img src="{img.url}" style="width:120px; height:80px; object-fit:cover; margin:4px; border-radius:6px;"/>')
            else:
                imgs.append(f'<div style="width:120px; height:80px; background:#f3f4f6; display:inline-block; margin:4px; border-radius:6px;"></div>')
        return format_html("".join(imgs))

    preview_images.short_description = "Image previews"


@admin.register(HomeHeroBanner)
class HomeHeroBannerAdmin(admin.ModelAdmin):
    list_display = ("hero_title", "created_at")


