from django.contrib import admin

from .models import SoilData, ESP32Log
# Register your models here.


admin.site.register(SoilData)
admin.site.register(ESP32Log)