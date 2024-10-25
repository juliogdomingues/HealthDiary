from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, permissions

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from . serializer import *
from . models import *

#Legacy
# class UserView(APIView):
#     serializer_class = UserSerializer

#     def get(self, request):
#         users = [ {"userName": user.userName,
#                    "firstName": user.firstName,
#                    "lastName": user.lastName,
#                    "password": user.password} 
#                   for user in User.objects.all()]
        
#         return Response(users)

#     def post(self, request):

#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return  Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permissions_classes = [permissions.AllowAny]
        

class LoginView(APIView):
    serializer_class = LoginSerializer
    authentication_classes = [TokenAuthentication]
    
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            print(token.user.id)
            return Response({'token': token.key, 'user_id': token.user.id})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
        
class AuthenticatedUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'success': 'You made an authenticated action'})