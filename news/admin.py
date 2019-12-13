from django.contrib import admin

# Register your models here.
from news.models import Author, Category, Article


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'email')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'text', 'author', 'published_date')

