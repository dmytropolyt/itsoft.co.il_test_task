import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";
import { formatDate } from "../../utils";

export { UserTransactions };

function UserTransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axiosInstance.get('/transactions/')
        .then(response => {
            setTransactions(response.data);
        })
        .catch(error => console.error(error));
    }, [])

    const getUserFromTransaction = (transactionOrder) => {
        const transactionInfo = transactionOrder.split(' - ');

        return transactionInfo[0]
    }

    const getStockFromTransaction = (transactionOrder) => {
        const transactionInfo = transactionOrder.split(' - ');

        return transactionInfo[2]
    }
    return (
        <div className="order-transac-container">
            <div className="order-transac-title">
                <h2>My Transactions</h2>
            </div>

            {transactions.length > 0 ? (
                <ul>
                    {transactions.map(transaction => (
                        <li className="order-transac transaction" key={transaction.id}>
                            <span>id: {transaction.id}</span>
                            <span>buyer: {getUserFromTransaction(transaction.buy_order)}</span>
                            <span>seller: {getUserFromTransaction(transaction.sell_order)}</span>
                            <span>stock: {getStockFromTransaction(transaction.sell_order)}</span>
                            <span>total: {transaction.total}</span>
                            <span>quantity: {transaction.quantity}</span>
                            <span className="order-transac-created-at">timestamp: {formatDate(transaction.timestamp)}</span>
                        </li>
                    ))}
                </ul>
             ) : (
                <h3>No transactions</h3>
            )}
            
        </div>
    )
}