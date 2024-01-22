from celery import shared_task
from celery.utils.log import get_task_logger

from .models import Transaction, Order
from .utils import process_matching_order

logger = get_task_logger(__name__)


@shared_task
def match_orders(new_order: dict[str, int]) -> None:
    """
    When order has been created,
    It searches for matching orders.
    """
    new_order = Order.objects.get(pk=new_order.get('new_order'))
    logger.info('Match orders')

    process_matching_order(new_order)
