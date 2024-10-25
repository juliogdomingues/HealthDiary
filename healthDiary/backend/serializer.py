from rest_framework import serializers
from django.contrib.auth.models import User
from . models import Symptom, Routine

# Legacy
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['userName', 'firstName', 'lastName', 'password']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password')

class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')