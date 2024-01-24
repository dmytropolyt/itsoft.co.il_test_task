import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";
import { formatDate } from "../../utils";

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

    return (
        <div className="order-transac-container ">
            <div className='order-transac-title'>
            <h2>My Orders</h2>
            </div>
            

            {orders.length > 0 ? (
            <ul>
                {orders.map(order => (
                    <li className={`order-transac ${order.status ? 'order-complete' : 'order-processing'}`} 
                     key={order.id}>
                        <span>id: {order.id}</span>
                        <span>stock: {order.stock}</span>
                        <span>order type: {order.order_type}</span>
                        <span>price: {order.price}</span>
                        <span>quantity: {order.quantity}</span>
                        <span>status: {order.status ? 'complete' : 'processing'}</span>
                        <span className="order-transac-created-at">created at: {formatDate(order.created_at)}</span>
                    </li>
                ))}
            </ul>
            ) : (
                <h3>No orders</h3>
            )}
            
        </div>
    )
}