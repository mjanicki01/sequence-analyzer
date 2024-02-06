from django.urls import path
from .views import SequenceAnalysisViewset

urlpatterns = [
    path('sequence-analysis/', SequenceAnalysisViewset.as_view(), name='sequence-analysis'),
]
