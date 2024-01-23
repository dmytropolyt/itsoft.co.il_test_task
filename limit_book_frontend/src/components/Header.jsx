import { UserControls } from "./header_components/UserControls";
import { useApp } from "../AppContext";

export { Header };

function Header() {
    const appContext = useApp();

    return (
        <header className='navbar'>
            <h1 className='logo'>Limit Book</h1>
            
            <UserControls isAuth={appContext.isAuth}/>
        </header>
    )
}