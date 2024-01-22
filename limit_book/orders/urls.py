from django.urls import path, include

from rest_framework import routers

from .views import OrderViewSet, TransactionListAPIView

router = routers.DefaultRouter()
router.register(r'order', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path(
        'transactions/',
        TransactionListAPIView.as_view(),
        name='transaction-list'
    )
]
