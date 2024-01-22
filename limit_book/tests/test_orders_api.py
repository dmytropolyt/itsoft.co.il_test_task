import pytest

from django.urls import reverse

from orders.models import Order


@pytest.mark.django_db
class TestOrdersAPI:
    model = Order
    test_data = {
        'price': '124.5450',
        'quantity': 150
    }

    def test_create_order(
            self, api_client_auth, stock_factory,
            celery_app, celery_worker
    ):
        stock = stock_factory.create()

        url = reverse('order-list')
        request_data = {
            'stock': stock.name,
            'order_type': 'buy',
            **self.test_data
        }

        response = api_client_auth.post(url, request_data)

        assert response.status_code == 201
        for key in request_data:
            assert request_data[key] == response.json()[key]

    def test_list_orders(self, api_client_auth, order_factory):
        orders = order_factory.create_batch(5)
        url = reverse('order-list')

        response = api_client_auth.get(url)

        assert response.status_code == 200
        assert len(response.json()) == len(orders)

    def test_retrieve_order(self, api_client_auth, order_factory):
        order = order_factory.create()
        url = reverse('order-detail', kwargs={'pk': order.pk})

        response = api_client_auth.get(url)
        print(response.json())
        assert response.status_code == 200

    def test_update_order(
            self, api_client_auth, order_factory, stock_factory
    ):
        order = order_factory.create()
        url = reverse('order-detail', kwargs={'pk': order.pk})

        stock = stock_factory.create()
        update_data = {
            'stock': stock.name, 'order_type': 'sell',
            'price': '200.1000', 'quantity': 200
        }
        response = api_client_auth.put(url, update_data)
        response_content = response.json()

        assert response.status_code == 200
        for key in update_data:
            assert response_content[key] == update_data[key]

    def test_partial_update_order(self, api_client_auth, order_factory):
        order = order_factory.create()
        url = reverse('order-detail', kwargs={'pk': order.pk})

        update_data = {'quantity': 2}
        response = api_client_auth.patch(url, update_data)

        assert response.status_code == 200
        assert response.json()['quantity'] == update_data['quantity']

    def test_delete_order(self, api_client_auth, order_factory):
        order = order_factory.create()
        url = reverse('order-detail', kwargs={'pk': order.pk})

        response = api_client_auth.delete(url)
        response_get = api_client_auth.get(url)

        assert response.status_code == 204
        assert response_get.status_code == 404
