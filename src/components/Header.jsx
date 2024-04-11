import { useEffect, useCallback } from "react"
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './header.css'
import { FaUserCircle } from "react-icons/fa";

import BurgerMenu from './BurgerMenu.jsx'

const Header = () => {
    const navigate = useNavigate()
    const navigateCallback = useCallback(() => navigate('/auth'), [navigate]);
    axios.defaults.withCredentials = true
    
    
  

    
    useEffect(() => {
        axios.get('http://18.185.2.123:5001/auth/verify')
        .then(res => {
            if(res.data.status) {
                
            } else {
                navigateCallback()
            }
            console.log(res)
        }).catch(error => {
            console.log(error, 'Verify error')
        })
    },[navigateCallback])

    const handleLogout = () => {
        axios.get('http://localhost:5001/auth/logout')
        .then(res => {
            if(res.data.status) {
                navigate('/auth')
            }
        }).catch(err =>{
            console.log(err)
        })
    }
   
      
    return (
        <div className="Home">
            <div className="container">
                <header>
                    <BurgerMenu/>
                    <div><h1 className="logo">Recipees.net</h1></div>
                    <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={handleLogout}>logout</button>
                    </div>
                    <div className="user__icon"><FaUserCircle/></div>
                </header>
            </div>
            
        </div>
    )
}

export default Header
