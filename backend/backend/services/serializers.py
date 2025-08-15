# serializers.py
from rest_framework import serializers
from .models import Service, InstalledDevice
from devices.models import Device
from customers.models import Customer

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'type', 'brand', 'price', 'description', 'picture_url']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone']

class InstalledDeviceSerializer(serializers.ModelSerializer):
    device = DeviceSerializer()
    customer = CustomerSerializer()

    class Meta:
        model = InstalledDevice
        fields = ['id', 'serial_number', 'installation_date', 'device', 'customer']

class ServiceSerializer(serializers.ModelSerializer):
    installed_device = InstalledDeviceSerializer()

    class Meta:
        model = Service
        fields = [
            'id',
            'installed_device',
            'type',
            'description',
            'start_date',
            'end_date',
            'price',
        ]
