from rest_framework import serializers

from .models import Order, Stock, Transaction


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    stock = serializers.SlugRelatedField(
        queryset=Stock.objects.all(), slug_field='name'
    )

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'stock', 'order_type',
            'price', 'status', 'quantity',
            'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'status']


class TransactionSerializer(serializers.ModelSerializer):
    buy_order = serializers.StringRelatedField()
    sell_order = serializers.StringRelatedField()

    class Meta:
        model = Transaction
        fields = [
            'id', 'buy_order', 'sell_order', 'total',
            'quantity', 'timestamp'
        ]
        read_only_fields = [
            'id', 'buy_order', 'sell_order', 'total',
            'quantity', 'timestamp'
        ]
