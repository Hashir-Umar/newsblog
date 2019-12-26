from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from accounts.models import User


class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)

    def __str__(self):
        return self.user.username


class Category(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title


class Tag(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title


class Status(models.Model):

    status = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=150, null=True)

    def __str__(self):
        return self.status


class Article(models.Model):
    title = models.CharField(max_length=100, unique=True)
    content = models.TextField(unique=True)
    tags = models.ManyToManyField(Tag)
    categories = models.ManyToManyField(Category)
    status = models.ManyToManyField(Status)
    author = models.OneToOneField(Author, on_delete=models.CASCADE)
    published_date = models.DateTimeField(null=True)

    def __str__(self):
        return self.title