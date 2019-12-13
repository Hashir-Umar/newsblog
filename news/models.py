from django.db import models


class Author(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def get_user_name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return self.email


class Category(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title


class Article(models.Model):
    title = models.CharField(max_length=100, unique=True)
    text = models.TextField()
    category = models.ManyToManyField(Category)
    author = models.OneToOneField(Author, on_delete=models.CASCADE)
    published_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
