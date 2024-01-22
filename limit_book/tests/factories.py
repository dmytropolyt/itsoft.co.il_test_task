import factory
from factory import fuzzy

from django.contrib.auth import get_user_model

from orders.models import Stock, Order, Transaction


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = factory.sequence(lambda n: f'Test{n}')
    password = 'testpass12'


class StockFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Stock

    name = factory.Faker('company')


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Order

    user = factory.SubFactory(UserFactory)
    stock = factory.SubFactory(StockFactory)
    order_type = fuzzy.FuzzyChoice(['buy', 'sell'])
    price = factory.Faker('pydecimal', left_digits=5, right_digits=4)
    status = False
    quantity = factory.Faker('pyint', min_value=1, max_value=200)
    created_at = factory.Faker('date_time_this_decade', tzinfo=None)


class TransactionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Transaction

    buy_order = factory.SubFactory(OrderFactory, order_type='buy')
    sell_order = factory.SubFactory(OrderFactory, order_type='sell')
    total = factory.Faker('pydecimal', left_digits=5, right_digits=4)
    quantity = factory.Faker('pyint', min_value=1, max_value=200)
    timestamp = factory.Faker('date_time_this_decade', tzinfo=None)
