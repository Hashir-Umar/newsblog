from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers

from . import views

urlpatterns = [
    path('BlogLogin', views.BlogLogin, name='blog_login'),
    path('GuestLogin', views.GuestLogin, name='guest_login'),
    path('BlogRegister', views.BlogRegister, name='blog_register'),
    path('GuestRegister', views.GuestRegister, name='guest_register'),
    path('ActivateUser', views.ActivateUser, name='activate_user'),
    path('ActivatePost', views.ActivatePost, name='activate_post'),
]