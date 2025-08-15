from rest_framework import serializers
from .models import InstalledDevice
from devices.models import Device
from customers.models import Customer

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'brand', 'type', 'picture_url']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email']

class InstalledDeviceSerializer(serializers.ModelSerializer):
    device = DeviceSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = InstalledDevice
        fields = "__all__"

