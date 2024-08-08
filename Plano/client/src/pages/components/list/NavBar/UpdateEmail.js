import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import "./UpdateEmail.css"

const UpdateEmail = ({user , setToggle}) => {
  const [email , setEmail] = useState(null)

  const handleSubmit = async(e) => {

    e.preventDefault()
    console.log(email)
    try {
      const response = await axios.post('http://localhost:5000/user/changeEmail', { id: user , newEmail: email })

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
        <div className='block-title'>Update <br/>Email</div>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='New Email'
            id="password"
            name="password"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='submit'
          />
        </form>
    </div>
  )
}

export default UpdateEmail