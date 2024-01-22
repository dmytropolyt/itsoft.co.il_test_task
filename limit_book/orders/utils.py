from .models import Order, Transaction


def find_matching_order(new_order: Order) -> Order:
    order_type = 'buy' if new_order.order_type == 'sell' else 'sell'

    return Order.objects.filter(
        stock=new_order.stock,
        price__lte=new_order.price,
        order_type=order_type,
        status=False
    ).exclude(user=new_order.user).order_by('price', 'created_at').first()


def create_transaction(buy_order: Order, sell_order: Order) -> int:
    trade_quantity = min(buy_order.quantity, sell_order.quantity)
    total_trade_sum = trade_quantity * sell_order.price

    transaction = Transaction.objects.create(
        sell_order=sell_order, buy_order=buy_order,
        total=total_trade_sum,
        quantity=trade_quantity
    )

    return trade_quantity


def process_matching_order(new_order: Order):
    matched_order = find_matching_order(new_order)

    if matched_order:
        sell_order = new_order \
            if new_order.order_type == 'sell' else matched_order
        buy_order = matched_order \
            if matched_order.order_type == 'buy' else new_order

        trade_quantity = create_transaction(buy_order, sell_order)

        delete_order(sell_order, trade_quantity)
        delete_order(buy_order, trade_quantity)

        process_matching_order(new_order)
    else:
        return


def delete_order(order: Order, trade_quantity: int) -> None:
    new_order_quantity = order.quantity - trade_quantity
    if new_order_quantity == 0:
        order.status = True

    order.quantity = new_order_quantity
    order.save()
