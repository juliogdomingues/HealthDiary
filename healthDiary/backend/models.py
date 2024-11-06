from django.contrib.auth.models import User
from django.db import models

class Sintoma(models.Model):
    title = models.CharField(max_length=60)
    description = models.CharField(max_length=200, default="Não especificado")
    date = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.owner.username} -> {self.title}({self.date.strftime('%m/%d/%Y, %H:%M')})"

class Tratamento(models.Model):
    title = models.CharField(max_length=60)
    description = models.CharField(max_length=200 , default="Não especificado")
    frequency = models.CharField(max_length=200, default="Não especificado")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.owner.username} -> {self.title}"