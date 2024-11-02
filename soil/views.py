from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SoilData, ESP32Log
from .serializers import SoilDataSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import logging

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class SoilDataView(APIView):
    def get(self, request, format=None):
        soil_data = SoilData.objects.all().order_by('-timestamp')
        serializer = SoilDataSerializer(soil_data, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        logger.debug(f'Raw data received: {request.body.decode("utf-8")}')
        logger.info(f'Received data: {request.data}')
        serializer = SoilDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('Data successfully saved.')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.error(f'Errors: {serializer.errors}')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def home(request):
    return render(request, 'soil/soil_data.html')


def hamzat_view(request):
    return render(request, 'soil/hamzat.html')






from django.http import JsonResponse

def get_logs(request):
    logs_by_device = {
        "logs_esp32_1": list(ESP32Log.objects.filter(device_id="esp32_1").order_by('-timestamp').values()),
        "logs_esp32_2": list(ESP32Log.objects.filter(device_id="esp32_2").order_by('-timestamp').values()),
        "logs_esp32_3": list(ESP32Log.objects.filter(device_id="esp32_3").order_by('-timestamp').values())
    }
    return JsonResponse(logs_by_device)









