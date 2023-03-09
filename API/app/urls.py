from django.urls import path
from .views import *

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('articles/', getArticles, name="allArticles"),
    path('articles/create/', createArticle, name="create-article"),
    path('articles/updateArticles/', updateArticles, name="update-articles"),
    path('articles/<str:pk>/delete/', deleteArticle, name="delete-article"),

    # Auth
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
