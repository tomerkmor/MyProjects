import React from 'react'
import CreateList from './CreateList'
import '../../../../App.css'
import './CreateList.css'

const ShowList = ({userText , itemDeleted , setItemDeleted , userList , setUserList}) => {

  return (

    // we have set that 'NaN' to prevent early load of the user's information
    <div className="createdList">
      {/* {userList[0].name !== "NaN" && ( */}
        <CreateList userText={userText} itemDeleted={itemDeleted} setItemDeleted={setItemDeleted} userList={userList} setUserList={setUserList}/>
      {/* ) */}
      {/* } */}
    </div>
  )
}

export default ShowList