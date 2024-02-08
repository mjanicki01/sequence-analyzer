from django.urls import path
from .views import SequenceAnalysisViewset, CreateUserViewset, CustomAuthViewset, LogoutViewset

urlpatterns = [
    path('sequence-analysis/', SequenceAnalysisViewset.as_view(), name='sequence-analysis'),
    path('register/', CreateUserViewset.as_view(), name='register'),
    path('login/', CustomAuthViewset.as_view(), name='api_token_auth'),
    path('logout/', LogoutViewset.as_view(), name='logout'),
]