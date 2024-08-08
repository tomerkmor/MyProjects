import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import "./Notifications.css"

const Notifications = ({user , setToggle}) => {
  const [val , setVal] = useState(1)

  const getNotifications = async () => {
  //   try {
  //       const response = await axios.get('http://localhost:5000/user/list?id='+userId)
  //       setVal(response.data.data)
  //   } catch(error) {
  //       console.log(error)
  //   }
  }

  const handleSubmit = async(e) => {

    e.preventDefault()
    console.log(val)
    try {
      const response = await axios.post('http://localhost:5000/user/changeExpD', { id: user , expD: val })

      const success = (response.status === 200)
      if (success){
          setToggle(false)
      } 

      if(!success){
          console.log("something went wrong with the password..")
      }
    } catch (error) {
        console.log(error)
    }
  }


  const add = (e) => {
    e.preventDefault();
    val < 3 ? setVal(val + 1) : console.log("trying to can't exeeced val 3")     
}

const sub = (e) => {
    e.preventDefault();
    val > 0 ? setVal(val - 1) : console.log("trying to decrease val 1")      
}


  return (
    <div className="block">
        <div className='block-title'>Notifications</div>
        <form onSubmit={handleSubmit}>

            <div>
              <button className='noti-button' type="button" onClick={sub}>-</button>
              {val}
              <button className='noti-button' type="button" onClick={add}>+</button>
            </div>
            <input
              type='submit'
            />

          
        </form>

        
    </div>
  )
}

export default Notifications