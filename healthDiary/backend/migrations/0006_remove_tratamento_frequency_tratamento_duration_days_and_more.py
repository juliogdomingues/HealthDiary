# Generated by Django 5.1.2 on 2024-11-07 13:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_tratamento_frequency_alter_sintoma_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tratamento',
            name='frequency',
        ),
        migrations.AddField(
            model_name='tratamento',
            name='duration_days',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='tratamento',
            name='initial_hour',
            field=models.TimeField(default=datetime.time(0, 0)),
        ),
        migrations.AddField(
            model_name='tratamento',
            name='interval_hours',
            field=models.IntegerField(default=12),
        ),
        migrations.AlterField(
            model_name='tratamento',
            name='description',
            field=models.TextField(blank=True, default='Não especificado'),
        ),
        migrations.AlterField(
            model_name='tratamento',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]