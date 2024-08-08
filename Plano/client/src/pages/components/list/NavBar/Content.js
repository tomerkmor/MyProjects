import React from 'react'
import "./Content.css"
import UpdatePass from './UpdatePass'
import UpdateEmail from './UpdateEmail'
import Notifications from './Notifications'
import LogOut from './LogOut'

const Content = ({user , setToggle}) => {
  return (
    <div className='content'>
        <UpdatePass user={user} setToggle={setToggle}/>
        <UpdateEmail user={user} setToggle={setToggle}/>
        <Notifications user={user} setToggle={setToggle}/>
        <LogOut user={user}/>
    </div>
  )
}

export default Content