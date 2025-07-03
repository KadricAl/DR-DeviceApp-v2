from rest_framework import serializers
from .models import Service
from installed_devices.serializers import InstalledDeviceSerializer

class ServiceSerializer(serializers.ModelSerializer):
    installed_device = InstalledDeviceSerializer(read_only=True)

    class Meta:
        model = Service
        fields = '__all__'
