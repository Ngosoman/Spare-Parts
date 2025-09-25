
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, OrderViewSet, initiate_stk_push, stk_push
from django.urls import path, include
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = router.urls

# Add the STK Push endpoint
urlpatterns += [
    path('', include(router.urls)), 
    
]

