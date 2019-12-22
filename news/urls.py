from django.conf.urls import url
from django.urls import path, include, re_path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('authors', views.AuthorView)
router.register('articles', views.ArticleView)
router.register('categories', views.CategoryView)
router.register('status', views.StatusView)
router.register('tags', views.TagView)

urlpatterns = [
    path('', include(router.urls)),
    # re_path('^(?P<first_name>\w+)$', UserListView.as_view(), name='my-first-user-view'),
]