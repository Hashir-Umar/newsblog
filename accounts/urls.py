from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('user', views.UserView)

urlpatterns = [
    path('', include(router.urls)),
]