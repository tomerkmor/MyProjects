import React, {useState , useEffect} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Title from '../components/list/title/Title'
import ShowList from '../components/list/list/ShowList'
import Search from '../components/list/bottom/Search'
import AddItem from '../components/list/bottom/AddItem'
import NavBar from '../components/list/NavBar/NavBar'

import '../../App.css'


function List() {
    const [cookie, setCookie , removeCookie] = useCookies(['user'])
    const userId = cookie.userId

    const [userText , setUserText] = useState("")
    const [userList , setUserList] = useState([])

    const [itemDeleted, setItemDeleted] = useState(1)
    const [toggle , setToggle] = useState(false)
    
    const getUserList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/list?id='+userId)
            console.log("lfdsjnkaafldjksldsfjklskdfa" , response.data.data)
            setUserList(response.data.data)
        } catch(error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUserList()
    },[userId , itemDeleted])

    return (
        <div className="App-header link">
            <div className="listDiv" style={{ width: "90%"}}>
                <NavBar user={userId} toggle={toggle} setToggle={setToggle} />
                {!toggle && (
                    <div>
                        <Title />
                        <ShowList userText={userText} itemDeleted={itemDeleted} setItemDeleted={setItemDeleted} userList={userList} setUserList={setUserList}/>
                        
                        <div>
                            <Search setUserText={setUserText}/>
                            <AddItem />
                        </div>
                    </div>
                )

                }
                
            </div>
        </div>
    )}

export default List;



