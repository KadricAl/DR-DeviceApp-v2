from rest_framework.routers import DefaultRouter
from .views import InstalledDeviceViewSet

router = DefaultRouter()
router.register(r'installed_devices', InstalledDeviceViewSet)

urlpatterns = router.urls