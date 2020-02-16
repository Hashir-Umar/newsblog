from django.http import HttpResponse
import json

from rest_framework import viewsets
from django.utils import timezone
from accounts.models import User
from news.models import Author, Article, Category, Tag, Status
from news.serializers import  AuthorSerializer, ArticleSerializer, CategorySerializer, StatusSerializer, TagSerializer
from django.core import serializers

from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist

def index(request):
    return HttpResponse("Hello, this is index page")

def ArticleList(request):

    author_id = request.GET.get("author_id")

    if isAuthorThanProceed(author_id) == 0:
        return HttpResponse(json.dumps({'success': '0', 'message': 'you are not a blog owner'}), content_type='application/json')

    articles = Article.objects.filter(author=author_id)

    parsedList = []

    for article in articles:

        status = Status.objects.get(article=article.id)
        categories_obj = getCategoriesObj(article.categories.all())
        tags_obj = getTagsObj(article.tags.all())
        formattedDate = getFormattedDateTime(status.action_date)

        parsedList.append({
                'id':article.id,
                'title': article.title,
                'body': article.content,
                'author_id': article.author_id,
                'status': status.status,
                'status_description': status.description,
                'status_action_date': formattedDate,
                'categories': categories_obj,
                'tags': tags_obj,
        })

    return HttpResponse(jsonResponse(parsedList), content_type='application/json')

def CategoryList(request):

    author_id = request.GET.get("author_id")

    if isAuthorThanProceed(author_id) == 0:
        return HttpResponse(json.dumps({'success': '0', 'message': 'you are not a blog owner'}), content_type='application/json')

    categories = Category.objects.filter(author_id=author_id)

    parsedList = []

    for category in categories:

        parsedList.append({
                'id':category.id,
                'title': category.title,
                'author_id': category.author.id,


        })

    return HttpResponse(jsonResponse(parsedList), content_type='application/json')


def TagList(request):

    author_id = request.GET.get("author_id")

    if isAuthorThanProceed(author_id) == 0:
        return HttpResponse(json.dumps({'success': '0', 'message': 'you are not a blog owner'}), content_type='application/json')

    tags = Tag.objects.filter(author_id=author_id)

    parsedList = []

    for tag in tags:
        parsedList.append({
                'id':tag.id,
                'title': tag.title,
                'author_id': tag.author.id,
        })


    return HttpResponse(jsonResponse(parsedList), content_type='application/json')


class AuthorView(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class ArticleView(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def create(self, request):
        post_data = request.data

        _author = Author.objects.get(id=post_data.get("author"))
        article = Article(title=post_data.get("title"), content=post_data.get("content"), author= _author)
        article.save()

        status = Status(status="Pending for Approval", action_date=timezone.now(), article=article)
        status.save()

        categories = post_data.get("categories")
        catIDs = categories.split(",")

        for catID in catIDs:
            cat = Category.objects.get(id=catID)
            article.categories.add(cat)

        tags = post_data.get("tags")
        tagIDs = categories.split(",")

        for tagID in tagIDs:
            tag = Tag.objects.get(id=tagID)
            article.tag.add(tag)


        dump = json.dumps({'success': '1', 'message': 'Successful.', 'data': {'id': article.id}})
        return HttpResponse(dump, content_type='application/json')

    def list(self, request):

        approved_articles = Status.objects.filter(status__icontains="Approved")

        ids = []
        for i in approved_articles:
            ids.append(i.article_id)

        articles = Article.objects.filter(id__in=ids)

        parsedList = []
        for article in articles:

            categories_obj = getCategoriesObj(article.categories.all())
            tags_obj = getTagsObj(article.tags.all())
            formattedDate = getFormattedDateTime(article.published_date)

            parsedList.append({
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'published_date': formattedDate,
                'author': article.author.id,
                'author_name': article.author.user.first_name + " " + article.author.user.last_name,
                'categories': categories_obj,
                'tags': tags_obj,
            })


        return HttpResponse(jsonResponse(parsedList), content_type='application/json')

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagView(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class StatusView(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

def isAuthorThanProceed(id):

    try:
      Author.objects.get(id=id)
      return 1
    except ObjectDoesNotExist:
        print("EXCEPTION: ObjectDoesNotExist")

    return 0

def getCategoriesObj(categories):

    categories_obj = []
    for i in categories:
        categories_obj.append({
            'id': i.id,
            'title': i.title,
        })

    return categories_obj

def getTagsObj(tags):
    tags_obj = []

    for i in tags:
        tags_obj.append({
            'id': i.id,
            'title': i.title,
        })

    return tags_obj

def getFormattedDateTime(dateTime):

    formattedDate = None
    try:
        formattedDate = dateTime.strftime("%Y-%m-%d %I:%M:%S %p")
    except:
        formattedDate = None

    return formattedDate

def jsonResponse(parsedList):

    data = {'success': '0', 'message': 'Failed.'}
    if len(parsedList) == 0:
        data = {'success': '0', 'message': 'No records were found.'}
    else:
        data = {'success': '1', 'message': 'Successful.', 'data': parsedList}

    return json.dumps(data)