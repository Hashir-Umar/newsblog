from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from news.models import Author, Article, Category


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'url', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        return attrs


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'url', 'title', 'author', 'category')

    def validate(self, attrs):
        return attrs


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'url', 'title')

    def validate(self, attrs):

        title = str(attrs.get('title'))
        if len(title) < 5:
            raise serializers.ValidationError("Title should be at-least 5 character long")

        return attrs
