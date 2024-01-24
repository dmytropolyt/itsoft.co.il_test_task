from django.urls import path, include

from rest_framework import routers

from .views import (
    OrderViewSet,
    TransactionListAPIView,
    StockListAPIView
)

router = routers.DefaultRouter()
router.register(r'order', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path(
        'transactions/',
        TransactionListAPIView.as_view(),
        name='transaction-list'
    ),
    
    path(
        'stocks/',
        StockListAPIView.as_view(),
        name='stock-list'
    )
]
