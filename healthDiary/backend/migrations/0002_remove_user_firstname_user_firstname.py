# Generated by Django 5.1.2 on 2024-10-23 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='firstname',
        ),
        migrations.AddField(
            model_name='user',
            name='firstName',
            field=models.CharField(default='', max_length=50),
        ),
    ]