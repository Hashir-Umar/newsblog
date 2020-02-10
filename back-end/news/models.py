from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from accounts.models import User

class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=30, null=True)
    country = models.CharField(max_length=30, null=True)
    active_on = models.DateTimeField(null=True)

class Category(models.Model):
    title = models.CharField(max_length=100, unique=True)

class Tag(models.Model):
    title = models.CharField(max_length=100, unique=True)

class Article(models.Model):
    title = models.CharField(max_length=100, unique=True)
    content = models.CharField(max_length=4000)
    tags = models.ManyToManyField(Tag)
    categories = models.ManyToManyField(Category)
    author = models.OneToOneField(Author, on_delete=models.CASCADE)
    published_date = models.DateTimeField(null=True)

class Status(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default="Pending for approval")
    action_date = models.DateTimeField(null=True)
    description = models.CharField(max_length=150, null=True)
