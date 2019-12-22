from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ADMIN = 1
    BLOG_OWNER = 2
    GUEST = 3
    ROLE_CHOICES = (
        (ADMIN, 'admin'),
        (BLOG_OWNER, 'blog_owner'),
        (GUEST, 'guest'),
    )

    role = models.IntegerField(choices=ROLE_CHOICES, null=False, default=3)

    # def __str__(self):
    #     return "Role: " + str(self.ROLE_CHOICES[self.role][1]) + ", Username: " + self.username + ", Email: " + self.email


    def __str__(self):
        return str(self.ROLE_CHOICES[self.role][1])
