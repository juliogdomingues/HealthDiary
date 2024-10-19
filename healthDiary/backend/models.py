from django.db import models

# Create your models here.
class User(models.Model):
    userName = models.CharField(max_length=50, default="", unique=True)
    firstName = models.CharField(max_length=50, default="")
    lastName = models.CharField(max_length=50, default="")
    
    password = models.CharField(max_length=50, default="")