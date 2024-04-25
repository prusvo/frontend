import { useEffect, useCallback } from "react"
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './header.css'
import { FaUserCircle } from "react-icons/fa";
import URL from "../url.jsx";

import BurgerMenu from './BurgerMenu.jsx'

const Header = () => {
    const navigate = useNavigate()
    const navigateCallback = useCallback(() => navigate('/auth'), [navigate]);
    axios.defaults.withCredentials = true
    
    
    

    
    // useEffect(() => {
    //     axios.get(`http://${URL.code}:5001/auth/acc`)
    //     .then(res => {
    //         if(res.data.status) {
    //             console.log(res.data.status)
    //         } else {
    //             navigateCallback()
    //         }
    //         console.log(res)
    //     }).catch(error => {
    //         console.log(error, 'Verify error')
    //     })
    // },[navigateCallback])
    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                navigateCallback()
            } else {
                console.log('User is Verify')
            }
        } catch (error) {
            console.log('User is no Verify')
        }
    }, [navigateCallback])

    const handleLogout = () => {
        axios.get(`http://${URL.code}:5001/auth/logout`)
        .then(res => {
            if(res.data.status) {
                localStorage.removeItem('token')
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
