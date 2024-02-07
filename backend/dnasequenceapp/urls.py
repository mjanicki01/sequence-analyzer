from django.urls import path
from rest_framework.authtoken import views
from .views import SequenceAnalysisViewset, CreateUserViewset

urlpatterns = [
    path('sequence-analysis/', SequenceAnalysisViewset.as_view(), name='sequence-analysis'),
    path('register/', CreateUserViewset.as_view(), name='register'),
    path('login/', views.obtain_auth_token, name='api_token_auth'),
]