from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('authors', views.AuthorView)
router.register('articles', views.ArticleView)
router.register('categories', views.CategoryView)

urlpatterns = [
    path('', include(router.urls))
]