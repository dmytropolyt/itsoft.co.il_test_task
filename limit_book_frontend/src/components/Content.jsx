import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home } from './content_components/Home';
import { Login } from './header_components/Login';
import { UserOrders } from './content_components/UserOrders';
import { UserTransactions } from './content_components/UserTransactions';

export { Content };

function Content() {

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/login/' element={<Login />} />
                <Route path='/my-orders/' element={<UserOrders />} />
                <Route path='/my-transactions/' element={<UserTransactions />} />
            </Routes>
        </Router>
    )
}