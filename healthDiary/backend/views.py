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

        if pk != None:

            try:
                query = Sintoma.objects.get(id=pk, owner=owner_user)
            except ObjectDoesNotExist:
                return Response({"error" : "O ID não existe, ou não pertence ao usuário"})
            
            serializer = SintomaSerializer(query)

        else:
            query = Sintoma.objects.filter(owner=owner_user)
            serializer = SintomaSerializer(query, many=True)

        return Response(serializer.data)

    def put(self, request, pk):
        owner_user = Token.objects.get(key=request.auth.key).user

        if pk != None:
            try:
                to_change = Sintoma.objects.get(id=pk, owner=owner_user)
            except ObjectDoesNotExist:
                return Response({"error" : "O ID não existe, ou não pertence ao usuário"})

            to_change.description = request.data['description']
            to_change.title = request.data['title']
            to_change.date = request.data['date']

            to_change.save()    
            return Response({"success":"Sintoma alterado com sucesso!"})

        else:
            return Response({"error":"Requisição inválida"}, status=400)
        
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
            date=request.data['date'],
            title=request.data['title'],
            description=request.data['description'],
            owner= owner_user
        )

        return Response({'success': 'Sintoma criado com sucesso!'})
    
class TratamentosView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Tratamento

    def get(self, request, pk=None):
        owner_user = Token.objects.get(key=request.auth.key).user

        if pk != None:
            query = Tratamento.objects.get(id=pk, owner=owner_user)
            serializer = TratamentoSerializer(query)

        else:
            query = Tratamento.objects.filter(owner=owner_user)
            serializer = TratamentoSerializer(query, many=True)

        return Response(serializer.data)
    
    def post(self, request):
        owner_user = Token.objects.get(key=request.auth.key).user

        Tratamento.objects.create(
            title=request.data['title'],
            description=request.data['description'],
            frequency=request.data['frequency'],
            owner= owner_user
        )

        return Response({'success': 'Tratamento criado com sucesso!'})
    
    def delete(self, request, pk):
        owner_user = Token.objects.get(key=request.auth.key).user

        if pk != None:
            to_change = Tratamento.objects.get(id=pk, owner=owner_user)

            to_change.delete()
            return Response({"success":"Sintoma removido com sucesso!"})

        else:
            return Response({"error":"requisição inválida"}, status=400)
        
    def put(self, request, pk):
        owner_user = Token.objects.get(key=request.auth.key).user

        if pk != None:
            try:
                to_change = Tratamento.objects.get(id=pk, owner=owner_user)
            except ObjectDoesNotExist:
                return Response({"error" : "O ID não existe, ou não pertence ao usuário"})

            to_change.description = request.data['description']
            to_change.title = request.data['title']
            to_change.frequency = request.data['frequency']

            to_change.save()    
            return Response({"success":"Tratamento alterado com sucesso!"})

        else:
            return Response({"error":"Requisição inválida"}, status=400)