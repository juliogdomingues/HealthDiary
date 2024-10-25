from django.contrib.auth.models import User
from django.db import models

# Create your models here.
# class User(models.Model):
#     userName = models.CharField(max_length=50, default="", unique=True)
#     firstName = models.CharField(max_length=50, default="")
#     lastName = models.CharField(max_length=50, default="")
    
#     password = models.CharField(max_length=50, default="")

class Symptom(models.Model):
    date = models.DateTimeField()
    description = models.CharField(max_length=120, default="Não especificado")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Routine(models.Model):
    ROUTINE_TYPES = {
        "RMD": "Medicação",
        "TTM": "Tratamento",
        "NAN": "Não Determinado"
    }
    
    type = models.CharField(max_length=3, choices=ROUTINE_TYPES, default="NAN")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
