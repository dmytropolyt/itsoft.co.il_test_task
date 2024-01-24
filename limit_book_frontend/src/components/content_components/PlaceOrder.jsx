import { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios';

export { PlaceOrder };

function PlaceOrder() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        axiosInstance.get('/stocks/')
        .then(response => {
            setStocks(response.data);
        })
        .catch(error => console.error(error))
    }, []);

    const handleSubmitForm = (event) => {
        event.preventDefault();

        axiosInstance.post('order/', new FormData(event.target))
        .then(response => console.log(response));
        

    }

    console.log(stocks);
    if (!stocks) return null;

    return (
        <div className='place-order'>

            <form className='place-order-form' onSubmit={handleSubmitForm}>

                <select 
                className='place-order-input place-order-select-stock' 
                name='stock'
                defaultValue={'placeholder'}
                >
                    <option value="placeholder" disabled hidden>Stock</option>
                    {stocks.map(stock => (
                        <option key={stock.name} value={stock.name}>{stock.name}</option>
                    ))}
                </select>

                <select 
                className='place-order-input place-order-select-type' 
                name='order_type'
                defaultValue={'placeholder'}
                >
                    <option value="placeholder" disabled hidden>Order Type</option>
                    <option value='sell'>Sell</option>
                    <option value='buy'>Buy</option>
                </select>

                <input className='place-order-input' type='number' placeholder='price' name='price' />
                <input className='place-order-input' type='number' placeholder='quantity' name='quantity' />

                <button className='place-order-btn' type='submit'>Place Order</button>
            </form>

        </div>
    )
}