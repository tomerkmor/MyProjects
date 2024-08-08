import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import "./LogOut.css"

const LogOut = () => {
  const [cookie, setCookie , removeCookie] = useCookies(['user'])
  const navigate = useNavigate()

  const onClick = () => {
    // toggle? setToggle(false) : setToggle(true)
    // setToggle(true)
    removeCookie('userId', cookie.userId)
    navigate('/')
}


  return (

        <button className="block log-out" onClick={onClick} >Log-Out</button>

  )
}

export default LogOut