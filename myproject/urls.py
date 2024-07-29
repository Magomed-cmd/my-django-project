from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from soil.views import home

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('soil.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#token = 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