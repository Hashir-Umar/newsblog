from rest_framework import serializers

from news.models import Author, Article, Category, Tag, Status


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

    def validate(self, attrs):
        user = str(attrs.get('user'))

        if user != "blog_owner":
            raise serializers.ValidationError("un-authorized user!! required blog owner")

        return attrs

    def create(self, validated_data):
        return Author(**validated_data)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'content', 'tags', 'categories', 'status', 'author',)

    def create(self, validated_data):
        return Article(**validated_data)

    def validate(self, attrs):
        title = str(attrs.get('title'))
        content = str(attrs.get('content'))

        if len(title) < 5:
            raise serializers.ValidationError("Title should be at-least 5 character long")

        if len(content) < 10:
            raise serializers.ValidationError("content should be descriptive and at-least 10 character long")

        return attrs


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('title', )

    def create(self, validated_data):
        return Category(**validated_data)

    def validate(self, attrs):
        title = str(attrs.get('title'))
        if len(title) < 5:
            raise serializers.ValidationError("Title should be at-least 5 character long")

        return attrs


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('title', )

    def create(self, validated_data):
        return Tag(**validated_data)

    def validate(self, attrs):
        title = str(attrs.get('title'))
        if len(title) < 5:
            raise serializers.ValidationError("Title should be at-least 5 character long")

        return attrs


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('status', 'description',)

    def create(self, validated_data):
        return Status(**validated_data)

    def validate(self, attrs):
        title = str(attrs.get('status'))
        if len(title) < 5:
            raise serializers.ValidationError("Status should be at-least 5 character long")

        return attrs
