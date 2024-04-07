import RegistrationForm from "../form/RegisterForm"
import LoginForm from "../form/LoginForm"
import { useState } from "react"
import './auth.css'
const Auth = () => {
const [switchBtn, setSwitchBtn] = useState(true)
  const swichButton = () => {
    setSwitchBtn(!switchBtn)
  }
  
    return (
<div className="Auth">
<div className="auth__box">
    <div className={switchBtn ? "register__form " : "register__form active"}>
        <RegistrationForm/>
        <p>Already have an account <button onClick={() => swichButton()} className="register__switch">Login</button>.</p>
    </div>
    <div className={switchBtn ? "login__form active" : "login__form"}>
        <LoginForm/>
        <p>Don't have an account? <button onClick={() => swichButton()} className="register__switch">Register </button></p>
        </div>
    
</div>
</div>
)
}

export default Auth