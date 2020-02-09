from django.db import models
from django.utils import timezone


class User(models.Model):
    ADMIN = 1
    BLOG_OWNER = 2
    GUEST = 3
    ROLE_CHOICES = (
        (ADMIN, 'admin'),
        (BLOG_OWNER, 'blog_owner'),
        (GUEST, 'guest'),
    )

    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(null=False, unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(
        default=False,
        help_text=(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(default=timezone.now)
    role = models.IntegerField(choices=ROLE_CHOICES, null=False, default=3)