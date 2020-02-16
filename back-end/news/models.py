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
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

class Tag(models.Model):
    title = models.CharField(max_length=100, unique=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)


class Article(models.Model):
    title = models.CharField(max_length=100, unique=True)
    content = models.CharField(max_length=4000)
    tags = models.ManyToManyField(Tag, null=True)
    categories = models.ManyToManyField(Category, null=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    published_date = models.DateTimeField(null=True)

class Status(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default="Pending for approval")
    action_date = models.DateTimeField(null=True)
    description = models.CharField(max_length=150, null=True)
