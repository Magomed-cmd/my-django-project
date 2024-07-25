from django.urls import path
from .views import SoilDataView

urlpatterns = [
    path('soil_data/', SoilDataView.as_view(), name='soil_data')
]
