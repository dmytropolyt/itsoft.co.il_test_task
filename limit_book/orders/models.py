from django.db import models
from django.contrib.auth import get_user_model

from django.core.validators import MinValueValidator

User = get_user_model()


class Stock(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Order(models.Model):
    ORDER_CHOICES = [
        ('buy', 'Buy'),
        ('sell', 'Sell'),
    ]
     
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, null=False, on_delete=models.CASCADE)
    order_type = models.CharField(max_length=4, choices=ORDER_CHOICES)
    price = models.DecimalField(
        max_digits=14, decimal_places=4, validators=[MinValueValidator(0.1)]
    )
    status = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.order_type} - ' \
               f'{self.stock} - {self.quantity}'


class Transaction(models.Model):
    buy_order = models.ForeignKey(
        Order, null=False, related_name='buy_order',
        on_delete=models.CASCADE
    )
    sell_order = models.ForeignKey(
        Order, null=False, related_name='sell_order',
        on_delete=models.CASCADE
    )
    total = models.DecimalField(max_digits=14, decimal_places=4)
    quantity = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sell_order.stock.name} - ' \
               f'{self.total} - {self.quantity}'
    