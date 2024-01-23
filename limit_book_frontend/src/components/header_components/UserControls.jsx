import { useState } from "react";
import { Login } from "./Login";
import { UserMenu } from "./UserMenu";

export { UserControls };

function UserControls({ isAuth }) {
    const [isOpen, setIsOpen] = useState(null);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
   
    return (
        <div className='user-controls'>
            <div className='user-img' onClick={handleOpen}>
                <i className="fas fa-user"></i>
            </div>

            <ul className=''>
            {isAuth 
             ? <UserMenu isOpen={isOpen} />
             : <Login isOpen={isOpen} />}
            </ul>

            
            
        </div>
    )
}