import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import "./UpdatePass.css"

import { useNavigate } from "react-router-dom";



const UpdatePass = ({user , setToggle}) => {
  const [password , setPassword] = useState(null)
  let navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(user)
    try {
      const response = await axios.post('http://localhost:5000/user/changePassword', {id: user , newPassword : password})

      const success = (response.status === 200)
      if (success){
          // navigate('/my-list')
          setToggle(false)
      } 

      if(!success){
          console.log("something went wrong with the password..")
      }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="block">
        <div className='block-title'>
          Update Password
        </div>

        <form onSubmit={handleSubmit}>
          <input

            type='password'
            placeholder='New password'
            id="password"
            name="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            
            type='submit'
          />
        </form>
    </div>
  )
}

export default UpdatePass