// import NavBar from "../components/NavBar"
import Register from "../components/home/register/Register"
import LoginForm from "../components/home/login/LoginForm"
import RegisterBtn from "../components/home/login/RegisterBtn"

import '../components/home/css/main.css'
import '../components/home/css/util.css'

import { useState } from 'react'


const Home = () => {
    const [showModal, setShowModal] = useState(false); {/* home page: show the login / registery form */ }

    return (
        <div className="container-login100-22">

            {/* Login Form */}
            {!showModal && (
            <div className="wrap-login100-2 p-l-55 p-r-55 p-t-65">
                <LoginForm />
                <RegisterBtn setShowModal={setShowModal}/>
            </div>
            )}

            
            {/* Register Form */}
            {showModal && 
                <Register setShowModal={setShowModal}/>
            }
        </div>
    )
}

export default Home