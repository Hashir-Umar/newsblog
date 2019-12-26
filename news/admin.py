from django.contrib import admin

# Register your models here.
from accounts.models import User
from news.models import Author, Category, Article


# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('id', 'username', 'email', )

#
# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ('id', 'title')

#
# @admin.register(Article)
# class ArticleAdmin(admin.ModelAdmin):
#     list_display = ('id', 'title', 'content', 'author', 'published_date')

