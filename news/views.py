from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from news.models import Author, Article, Category
from news.serializers import AuthorSerializer, ArticleSerializer, CategorySerializer


def index(request):
    return HttpResponse("Hello, this is index page")


class AuthorView(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class ArticleView(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
