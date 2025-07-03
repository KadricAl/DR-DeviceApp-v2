from rest_framework import serializers
from .models import InstalledDevice
from devices.serializers import DeviceSerializer
from customers.serializers import CustomerSerializer

class InstalledDeviceSerializer(serializers.ModelSerializer):
    device = DeviceSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = InstalledDevice
        fields = '__all__'
