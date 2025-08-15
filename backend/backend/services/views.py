from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        installed_device_id = self.request.query_params.get("installed_device")
        if installed_device_id:
            queryset = queryset.filter(installed_device_id=installed_device_id)
        return queryset