from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view

from . serializer import *
from . models import *
# Create your views here.

class UserView(APIView):
  
    serializer_class = UserSerializer

    def get(self, request):
        users = [ {"userName": user.userName,
                   "firstName": user.firstName,
                   "lastName": user.lastName,
                   "password": user.password} 
                  for user in User.objects.all()]
        
        return Response(users)

    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)
