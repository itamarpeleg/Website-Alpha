from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Article, Categories
from .serializers import ArticleSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getArticles(request):
    user = request.user
    all_articles = (Article.objects.filter(user=user.id)).order_by('-updatedAt')
    serializer = ArticleSerializer(all_articles, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createArticle(request):
    data = request.data
    article = Article.objects.create(
        title=data['title'],
        content=data['content'],
        year_created=data['year'],
        user=request.user
    )
    for i in data['categories']:
        if Categories.objects.filter(title=i).exists() == False:
            new_category = Categories.objects.create(title=i)
            article.categories.add(new_category)
        else:
            article.categories.add(Categories.objects.get(title=i))
            
    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateArticles(request):
    data = request.data 
    all_articles = Article.objects.all()
    for article in data:
        if 'id' not in article.keys() and article['title'] != "" and Article.objects.filter(uniqueId=article['uniqueId']).exists() == False:
            newArticle = Article.objects.create(
                title=article['title'],
                content=article['content'],
                year_created=article['year_created'],
                uniqueId = article['uniqueId'],
                user=request.user
            )
            for i in article['categories']:
                if Categories.objects.filter(title=i).exists() == False:
                    new_category = Categories.objects.create(title=i)
                    newArticle.categories.add(new_category)
                else:
                    newArticle.categories.add(Categories.objects.get(title=i))
        elif 'edited' in article.keys() and article['edited'] == True:
            article_spec = Article.objects.get(uniqueId=article['uniqueId'])
            article_spec.title = article['title']
            article_spec.content = article['content']
            article_spec.year_created = article['year_created']
            article_spec.save()
    serializer = ArticleSerializer(all_articles, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteArticle(request, pk):
        article = Article.objects.get(uniqueId=pk)
        article.delete()
        return Response('Article was deleted')
