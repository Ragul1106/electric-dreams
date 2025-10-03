from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True)
    image = models.ImageField(upload_to="home/services/")
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers show first")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "created_at"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.title


class HomeFAQSection(models.Model):
    heading = models.CharField(max_length=255, default="Frequently Asked Questions")
    subheading = models.CharField(max_length=512, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Home FAQ Section"
        verbose_name_plural = "Home FAQ Sections"
        ordering = ["-created_at"]

    def __str__(self):
        return self.heading


class FAQItem(models.Model):
    section = models.ForeignKey(
        HomeFAQSection, on_delete=models.CASCADE, related_name="faqs"
    )
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.question


class HomeBrandsSection(models.Model):
    heading = models.CharField(max_length=255, default="Trusted Brands We Work With")
    cta_text = models.CharField(max_length=255, default="Get in Touch with Electric Dreams Electrical Today")
    phone_number = models.CharField(max_length=20, default="+91-1234567890")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Home Brands Section"
        verbose_name_plural = "Home Brands Sections"
        ordering = ["-created_at"]

    def __str__(self):
        return self.heading


class BrandLogo(models.Model):
    section = models.ForeignKey(
        HomeBrandsSection, on_delete=models.CASCADE, related_name="logos"
    )
    image = models.ImageField(upload_to="home/brands/")
    name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name or f"Logo {self.id}"


class HomeReviewsSection(models.Model):
    heading = models.CharField(max_length=255, default="What Our Happy Customers Are Saying")
    subheading = models.CharField(max_length=512, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Home Reviews Section"
        verbose_name_plural = "Home Reviews Sections"
        ordering = ["-created_at"]

    def __str__(self):
        return self.heading


class Review(models.Model):
    section = models.ForeignKey(HomeReviewsSection, on_delete=models.CASCADE, related_name="reviews")
    stars = models.PositiveSmallIntegerField(default=5)
    text = models.TextField(blank=True)
    person_image = models.ImageField(upload_to="home/reviews/", blank=True, null=True)
    person_name = models.CharField(max_length=255, blank=True)
    service = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.person_name} - {self.stars}⭐"



class HomeStepsSection(models.Model):
    """
    Single table storing the three-step process content in one row.
    Fields: heading + three steps each with number_label, title, description.
    """
    heading = models.CharField(max_length=255, default="Our Proven Three Step Process")
    # Step 1
    step1_number = models.CharField(max_length=10, blank=True, default="1")
    step1_title = models.CharField(max_length=255, blank=True)
    step1_description = models.TextField(blank=True)
    # Step 2
    step2_number = models.CharField(max_length=10, blank=True, default="2")
    step2_title = models.CharField(max_length=255, blank=True)
    step2_description = models.TextField(blank=True)
    # Step 3
    step3_number = models.CharField(max_length=10, blank=True, default="3")
    step3_title = models.CharField(max_length=255, blank=True)
    step3_description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Home Steps Section"
        verbose_name_plural = "Home Steps Sections"
        ordering = ["-created_at"]

    def __str__(self):
        return self.heading



class HomeStatsSection(models.Model):
    heading = models.CharField(max_length=255, default="Home Stats", help_text="Main heading text")
    title = models.CharField(max_length=255, help_text="Optional subtitle or section title")

    image1 = models.ImageField(upload_to="home/stats/", blank=True, null=True)
    image2 = models.ImageField(upload_to="home/stats/", blank=True, null=True)
    image3 = models.ImageField(upload_to="home/stats/", blank=True, null=True)
    image4 = models.ImageField(upload_to="home/stats/", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Home Stats Section"
        verbose_name_plural = "Home Stats Sections"

    def __str__(self):
        return self.heading  # Show heading in admin


class StatItem(models.Model):
    section = models.ForeignKey(
        HomeStatsSection, on_delete=models.CASCADE, related_name="stats"
    )
    value = models.CharField(max_length=50)      # e.g. "50+", "98%"
    title = models.CharField(max_length=255)     # e.g. "Years of Industry Experience"
    description = models.TextField()

    def __str__(self):
        return f"{self.value} - {self.title}"


class HomeHeroBanner(models.Model):
    bg_img = models.ImageField(upload_to="home/hero/", blank=True, null=True)
    hero_img = models.ImageField(upload_to="home/hero/", blank=True, null=True)
    hero_title = models.CharField(max_length=255)
    hero_subtitle = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Home Hero Banner"
        verbose_name_plural = "Home Hero Banners"

    def __str__(self):
        return self.hero_title

class CallbackSection1(models.Model):
    # Banner image
    banner = models.ImageField(upload_to="callback/", blank=True, null=True)

    # Left column content
    title = models.CharField(
        max_length=255,
        default="Professional Emergency Electrician - Fast & Reliable",
    )
    subtitle = models.TextField(
        blank=True,
        default="24-hour Electrician In Electric dreams. Call Our Professional Electricians Now To Get Help Fast",
    )
    stars_count = models.PositiveSmallIntegerField(default=5)
    reviews_text = models.CharField(max_length=255, blank=True, default="Over 215 google reviews")

    # call block image + phone
    call_image = models.ImageField(upload_to="callback/", blank=True, null=True)
    phone_number = models.CharField(max_length=80, blank=True, default="(+91)1234567890")

    # Feature cards stored in JSON. Use models.JSONField which works on SQLite (Django >= 3.1)
    feature_cards = models.JSONField(blank=True, default=list)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Home Page content"



class CallbackSection2(models.Model):
    title = models.CharField(max_length=255, default="Quality Workmanship")
    paragraphs = models.JSONField(default=list, blank=True)  # list of paragraph strings
    phone = models.CharField(max_length=80, blank=True, default="+611234567890")
    image = models.ImageField(upload_to="callback/section2/", blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Callback Section 2"
    


class CallbackSection3(models.Model):
    banner_title = models.CharField(
        max_length=255,
        default="Get in Touch with Electric Dreams Electrical Today",
    )
    phone = models.CharField(max_length=80, blank=True, default="(+91)1234567890")
    section_title = models.CharField(max_length=255, default="Signs you need an emergency electrician")
    intro = models.TextField(
        blank=True,
        default="Many signs indicate when it’s time to call a 24 hour electrician for help with your electrical problems. Here’s a quick list of what to look for:"
    )
    points = models.JSONField(blank=True, default=list)  # list of bullet strings
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Callback Section 3"