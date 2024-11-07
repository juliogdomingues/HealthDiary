from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
import datetime

class Sintoma(models.Model):
    title = models.CharField(max_length=60)
    description = models.CharField(max_length=200, default="Não especificado")
    date = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.owner.username} -> {self.title}({self.date.strftime('%m/%d/%Y, %H:%M')})"


class Tratamento(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='Não especificado')
    initial_hour = models.TimeField(default=datetime.time(0, 0))  # Set default to midnight
    interval_hours = models.IntegerField(default=12)
    duration_days = models.IntegerField(default=1)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.owner.username} -> {self.title}"