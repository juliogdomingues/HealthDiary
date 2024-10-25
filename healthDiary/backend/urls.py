from django.urls import path, include
from . views import *

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('auth_test/', AuthenticatedUserView.as_view())
]
