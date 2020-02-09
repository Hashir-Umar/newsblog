from rest_framework import serializers

from accounts.models import User
from news.models import Author, Article, Category, Tag, Status

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

def create(self, validated_data):
    _email = validated_data.get('email')
    print(_email)

    #email should be unique
    allUsers = User.objects.filter(email=_email)

    if len(allUsers) == 0:
        data = {
            'success': '0',
            'message': 'Email already present!! try another email address.'
        }
        raise serializers.ValidationError(data)
    else:
        return User.objects.create(**validated_data)





