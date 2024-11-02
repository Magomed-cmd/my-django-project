from django.urls import path
from .views import SoilDataView
from .views import get_logs
from .views import hamzat_view


urlpatterns = [
    path('soil_data/', SoilDataView.as_view(), name='soil_data'),
    path('logs/get/', get_logs, name='get_logs'),
    path('hamzat/', hamzat_view, name='hamzat')
]
