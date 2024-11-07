from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, permissions
from rest_framework import status

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
    serializer_class = TratamentoSerializer

    def get(self, request, pk=None):
        # Obtém o usuário associado ao token de autenticação
        owner_user = Token.objects.get(key=request.auth.key).user

        # Se um ID específico for fornecido, retorna o tratamento correspondente
        if pk is not None:
            try:
                query = Tratamento.objects.get(id=pk, owner=owner_user)
            except Tratamento.DoesNotExist:
                return Response({"erro": "Tratamento não encontrado"}, status=status.HTTP_404_NOT_FOUND)
            serializer = TratamentoSerializer(query)
        else:
            # Caso contrário, retorna todos os tratamentos do usuário
            query = Tratamento.objects.filter(owner=owner_user)
            serializer = TratamentoSerializer(query, many=True)

        return Response(serializer.data)

    def post(self, request):
        owner_user = Token.objects.get(key=request.auth.key).user

        # Cria os dados do tratamento com os campos adicionais
        tratamento_data = {
            'title': request.data.get('title'),
            'description': request.data.get('description', 'Não especificado'),
            'initial_hour': request.data.get('initial_hour'),
            'interval_hours': request.data.get('interval_hours', 12),
            'duration_days': request.data.get('duration_days', 1),
            'owner': owner_user.id,
            'is_completed': request.data.get('is_completed', False)  # Default to False if not provided
        }

        # Valida e salva o novo tratamento usando o serializer
        serializer = TratamentoSerializer(data=tratamento_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'sucesso': 'Tratamento criado com sucesso!', 'dados': serializer.data})
        
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        owner_user = Token.objects.get(key=request.auth.key).user

        # Tenta encontrar e deletar o tratamento especificado
        try:
            tratamento = Tratamento.objects.get(id=pk, owner=owner_user)
            tratamento.delete()
            return Response({"sucesso": "Tratamento removido com sucesso!"})
        except Tratamento.DoesNotExist:
            return Response({"erro": "Tratamento não encontrado ou não pertence ao usuário"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        owner_user = Token.objects.get(key=request.auth.key).user

        # Tenta encontrar o tratamento para atualizar
        try:
            tratamento = Tratamento.objects.get(id=pk, owner=owner_user)
        except Tratamento.DoesNotExist:
            return Response({"erro": "Tratamento não encontrado ou não pertence ao usuário"}, status=status.HTTP_404_NOT_FOUND)

        # Atualiza os campos se estiverem presentes nos dados da requisição
        tratamento.title = request.data.get('title', tratamento.title)
        tratamento.description = request.data.get('description', tratamento.description)
        tratamento.initial_hour = request.data.get('initial_hour', tratamento.initial_hour)
        tratamento.interval_hours = request.data.get('interval_hours', tratamento.interval_hours)
        tratamento.duration_days = request.data.get('duration_days', tratamento.duration_days)
        tratamento.is_completed = request.data.get('is_completed', tratamento.is_completed)  # Update is_completed

        tratamento.save()
        return Response({"sucesso": "Tratamento alterado com sucesso!"})
