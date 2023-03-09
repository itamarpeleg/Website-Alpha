from rest_framework.serializers import ModelSerializer
from .models import Article, Categories
from rest_framework import serializers

class ArticleSerializer(ModelSerializer):
    categories = serializers.SerializerMethodField()
    all_categories = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
        'id',
        'title',
        'year_created',
        'createdAt',
        'updatedAt',
        'categories',
        'content',
        'all_categories',
        'user',
        'uniqueId',
        ]
    
    def get_categories(self, obj):
        data = CategorySerializer(obj.categories.all(), many=True).data
        return data

    def get_all_categories(self, obj):
        all_categories_query = Categories.objects.all()
        serializer = CategorySerializer(all_categories_query, many=True)
        return serializer.data

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id','title']
