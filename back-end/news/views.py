from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import json

# Create your views here.
from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView

from accounts.models import User
from news.models import Author, Article, Category, Tag, Status
from news.serializers import AuthorSerializer, ArticleSerializer, CategorySerializer, StatusSerializer, TagSerializer

def index(request):
    return HttpResponse("Hello, this is index page")


def go(request):

    data = {
            'name': 'Vitor',
            'location': 'Finland',
            'is_active': True,
            'count': 28
    }
    dump = json.dumps(data)
    return HttpResponse(dump, content_type='application/json')


class AuthorView(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class ArticleView(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TagView(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class StatusView(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
