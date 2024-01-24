from django.db.models import Q

from rest_framework.viewsets import ModelViewSet
from rest_framework import generics

from .models import Order, Transaction, Stock
from .serializers import OrderSerializer, TransactionSerializer, StockSerializer
from .tasks import match_orders


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        new_order = serializer.save(user=self.request.user, status=False)

        match_orders.delay({'new_order': new_order.pk})


class TransactionListAPIView(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user_transactions = Transaction.objects.filter(
            Q(buy_order__user=self.request.user) | Q(sell_order__user=self.request.user)
        ).prefetch_related(
            'buy_order__user', 'sell_order__user'
        )

        return user_transactions
    

class StockListAPIView(generics.ListAPIView):
    serializer_class = StockSerializer
    queryset = Stock.objects.all()
    
