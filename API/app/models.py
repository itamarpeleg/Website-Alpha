from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Categories(models.Model):
    title = models.CharField(max_length=10000)
    
    def __str__(self):
        return self.title

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    uniqueId = models.CharField(max_length=128, null=True)
    title = models.CharField(max_length=10000)
    year_created = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True, null=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True)
    categories = models.ManyToManyField(Categories)
    content = models.TextField(blank=True, default="write some text here")

    def __str__(self):
        return self.title