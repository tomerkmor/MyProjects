import React, {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Content from './Content'

const NavBar = ({user , toggle, setToggle}) => {

    const [cookie, setCookie , removeCookie] = useCookies(['user'])
    const navigate = useNavigate()

    const onClick = () => {
        toggle? setToggle(false) : setToggle(true)
        // setToggle(true)
        // removeCookie('userId', cookie.userId)
        // navigate('/')
    }
    
    return (
        <div>
            <div style={{height:"5%", marginTop: "5%"}}>
                <button onClick={onClick} style={{fontSize: 40, background: "#FF5349", margin: "0 auto"}}>SETTINGS</button>
            </div>

            { toggle && (
                <Content user={user} setToggle={setToggle}/>
            )}
        </div>
        
    )
}

export default NavBar