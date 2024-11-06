from rest_framework import serializers
from django.contrib.auth.models import User
from . models import *

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

    def create(self, validated_data): #Utilizado na CreateAPIView
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')

class SintomaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sintoma
        fields = ('id', 'title', 'description', 'date', 'owner')

class TratamentoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tratamento
        fields = ('id', 'title', 'description', 'frequency', 'owner')