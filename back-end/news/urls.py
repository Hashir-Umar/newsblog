from django.conf.urls import url
from django.urls import path, include, re_path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('authors', views.AuthorView)
router.register('posts', views.ArticleView)
router.register('categories', views.CategoryView)
router.register('status', views.StatusView)
router.register('tags', views.TagView)

urlpatterns = [
    url(r'^BlogManagement/PostList/$', views.ArticleList),
    url(r'^BlogManagement/CategoryList/$', views.CategoryList),
    url(r'^BlogManagement/TagList/$', views.TagList),
    path('', include(router.urls)),
]