from django.contrib import admin

from .models import Order, Transaction, Stock

admin.site.register(Stock)
admin.site.register(Order)
admin.site.register(Transaction)
