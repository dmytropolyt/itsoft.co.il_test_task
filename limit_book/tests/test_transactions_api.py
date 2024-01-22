import pytest

from django.urls import reverse


@pytest.mark.django_db
class TestTransactionAPI:

    def test_list_transactions(
            self, api_client_auth, django_user_model,
            transaction_factory, order_factory
    ):
        url = reverse('transaction-list')

        user = django_user_model.objects.get(username='Test')
        order = order_factory.create(user=user, order_type='buy')
        transaction = transaction_factory.create(buy_order=order)
        transaction_factory.create_batch(5)

        response = api_client_auth.get(url)
        assert response.status_code == 200
        assert len(response.json()) == 1
