import { useEffect } from "react";
import { useAppDispatch } from "../../AppContext";
import { axiosInstance } from "../../axios";

export { UserMenu };

function UserMenu({ isOpen }) {
    const dispatch = useAppDispatch();

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        axiosInstance.defaults.headers['Authorization'] = null;

        dispatch({ type: 'LOGIN', payload: false });
    }

    return (
        <div className={`overlay-user-menu ${isOpen ? 'show' : ''}`}>
            <div className='user-menu'>
                <div className="user-menu-links">
                    
                    <a href='/place-order'>Place Order</a>
                    <a href='/my-orders'>My Orders</a>
                    <a href='/my-transactions'>My Transactions</a>
                
                </div>
                <hr className="line-menu" />
                <button type='button' className='logout-btn' onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}