import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";

export { UserOrders };

function UserOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosInstance.get('order/')
        .then(response => {
            setOrders(response.data);
        })
        .catch(error => console.error(error));
    }, [])
    console.log(orders)

    return (
        <div className="user-orders-container">
            <div className='user-orders-title'>
            <h2>My Orders</h2>
            </div>
            

            {orders.length > 0 ? (
            <ul>
                {orders.map(order => (
                    <li className={`user-order ${order.status ? 'order-complete' : 'order-processing'}`} 
                     key={order.id}>
                        <span>id: {order.id}</span>
                        <span>stock: {order.stock}</span>
                        <span>order type: {order.order_type}</span>
                        <span>price: {order.price}</span>
                        <span>quantity: {order.quantity}</span>
                        <span>status: {order.status ? 'complete' : 'processing'}</span>
                        <span className="order-created-at">created at: {formatDate(order.created_at)}</span>
                    </li>
                ))}
            </ul>
            ) : (
                <h3>No orders</h3>
            )}
            
        </div>
    )
}

function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate.replace(',', '');
}