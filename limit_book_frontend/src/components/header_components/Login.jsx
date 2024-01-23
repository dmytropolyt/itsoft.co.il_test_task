import { axiosInstance } from "../../axios";
import { useAppDispatch } from "../../AppContext";
export { Login };

function Login({ isOpen }) {
    const dispatch = useAppDispatch();

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        
        axiosInstance.post('auth/jwt/create/', new FormData(event.target))
        .then(response => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'Bearer ' + localStorage.getItem('access_token');
            dispatch({ type: 'LOGIN',  payload: true });
        })
        .catch(error => console.error(error))

    }

    return (
        <div className="login">
            
            <div className={`overlay-login ${isOpen ? 'show' : ''}`}>
                <div className="login-window">

                    <form className='login-form' onSubmit={handleSubmitLogin}>
                        <input type="text" className="login-input"
                         name='username' placeholder='Username' />

                        <input type="password" className="login-input"
                         name='password' placeholder='Password' />

                        <button type="submit" className="login-btn">
                            Log in
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}