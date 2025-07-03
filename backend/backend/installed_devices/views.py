from rest_framework import viewsets
from .models import InstalledDevice
from .serializers import InstalledDeviceSerializer

class InstalledDeviceViewSet(viewsets.ModelViewSet):
    queryset = InstalledDevice.objects.all()
    serializer_class = InstalledDeviceSerializer

