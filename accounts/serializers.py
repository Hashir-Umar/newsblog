from rest_framework import serializers

from accounts.models import User
from news.models import Author, Article, Category, Tag, Status


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'



