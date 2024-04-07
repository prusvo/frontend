import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import './burgermenu.css'


const BurgerMenu = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }
    const handleLogout = () => {
        axios.get('http://localhost:5000/auth/logout')
        .then(res => {
            if(res.data.status) {
                navigate('/auth')
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    return(
        <div>
           <button onClick={() => toggle()} className="burger-button"> 
                    <RxHamburgerMenu /></button>
                    
                    <div className={open ? 'burger_menu toggle-burger' : 'burger_menu'}>
                    
                        <div className="burger__links">
                            <div className="burger__link"><h3>Menu:</h3></div>
                            <div className="burger__link"><Link to="/">home</Link></div>
                            <div className="burger__link"><Link to="/search">Search</Link></div>
                            <div className="burger__link"><button onClick={handleLogout}>logout</button></div>
                            
                           
                            
                            
                        </div>
                        <div className={open ? 'blur open' : 'blur'}></div>
                    </div>
        </div>
        
        
        
        
    )
}
export default BurgerMenu