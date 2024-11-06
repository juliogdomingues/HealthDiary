from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, permissions

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

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
            #print(token.user.id)
            return Response({'token': token.key, 'user_id': token.user.id})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
        

class AuthenticatedUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'success': 'You made an authenticated action'})
    


class SintomasView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Sintoma

    def get(self, request, pk=None):
        owner_user = Token.objects.get(key=request.auth.key).user


        print(pk)
        if pk != None:
            query = Sintoma.objects.get(id=pk, owner=owner_user)
            serializer = SintomaSerializer(query)

        else:
            query = Sintoma.objects.filter(owner=owner_user)
            serializer = SintomaSerializer(query, many=True)

        return Response(serializer.data)

    def put(self, request, pk):
        owner_user = Token.objects.get(key=request.auth.key).user

        if pk != None:
            to_change = Sintoma.objects.get(id=pk, owner=owner_user)

            if to_change == None: return Response({"error":"requisição inválida"}, status=401) 

            to_change.description = request.data['descricao']
            to_change.title = request.data['titulo']
            to_change.date = request.data['data_hora_criacao']

            to_change.save()    
            return Response({"success":"Sintoma alterado com sucesso!"})

        else:
            return Response({"error":"requisição inválida"}, status=401)
        
    def delete(self, request, pk):
        owner_user = Token.objects.get(key=request.auth.key).user

        if pk != None:
            to_change = Sintoma.objects.get(id=pk, owner=owner_user)

            if to_change == None: return Response({"error":"requisição inválida"}, status=401)

            to_change.delete()
            return Response({"success":"Sintoma alterado com sucesso!"})

        else:
            return Response({"error":"requisição inválida"}, status=401)

    def post(self, request):
        owner_user = Token.objects.get(key=request.auth.key).user

        Sintoma.objects.create(
            date=request.data['data_hora_criacao'],
            title=request.data['titulo'],
            description=request.data['descricao'],
            owner= owner_user
        )

        return Response({'success': 'You created a new symptom'})