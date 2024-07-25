from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SoilData
from .serializers import SoilDataSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class SoilDataView(APIView):
    def get(self, request, format=None):
        soil_data = SoilData.objects.all().order_by('-timestamp')
        serializer = SoilDataSerializer(soil_data, many=True)
        return JsonResponse(serializer.data, safe=False)

    @method_decorator(csrf_exempt)
    def post(self, request, format=None):
        serializer = SoilDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return render(request, 'soil/soil_data.html')
