import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { Home } from './content_components/Home';
import { Login } from './header_components/Login';
import { UserOrders } from './content_components/UserOrders';
import { UserTransactions } from './content_components/UserTransactions';
import { PlaceOrder } from './content_components/PlaceOrder';

export { Content };

function Content() {

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/login/' element={<Login />} />

                <Route element={<PrivateRoutes />}>
                    <Route path='/my-orders/' element={<UserOrders />} />
                    <Route path='/my-transactions/' element={<UserTransactions />} />
                    <Route path='/place-order/' element={<PlaceOrder />} />
                </Route>
            </Routes>
        </Router>
    )
}