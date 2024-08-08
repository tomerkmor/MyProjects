import React, {useState , useEffect} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core';
//import {ArrowBackIcon, GetApp} from '@material-ui/icons/ArrowBack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";
// var Barcode = require('react-barcode');
//import {Button} from '@material-ui/core';
//import { useBarcode } from '@createnextapp/react-barcode';

import BarcodeScanner from '../components/scan-item/BarcodeScanner';


function Scan({list}) {
    const [cookie, setCookie , removeCookie] = useCookies(['user'])

    const userId = cookie.userId

    const [userText , setUserText] = useState("")
    const [userList , setUserList] = useState("")

    const [listUpdated, setListUpdated] = useState(false)


    const [itemDeleted, setItemDeleted] = useState(1)
    const [itemAdded, setItemAdded] = useState(false)

    const [barcode2, setBarcode2] = useState(' ');
    const [addManually , setAddManually] = useState(false)
    
        const getUserList = async () => {
            console.log("userId ====== " + userId)
            try {
                const response = await axios.get('http://localhost:5000/user/list?id='+userId)
                // console.log("GET DATA FROM DATABASE : ", response.data.data)
                setUserList(response.data.data)
                setListUpdated(true)
                setItemAdded(false)
            } catch(error) {
                console.log(error)
            }
        }

        const [shallWe , setShallWe] = useState(true)
        const rerender = () => {
            setShallWe(false)
            setItemDeleted(itemDeleted + 1)
        }

    // search input
    const handleChange = (e) => {
        const value = e.target.value.toLowerCase()
        setUserText(value)
    }

    const [addItem,setAddItem] = useState(false)
    const onClick = () => {
        if(!addItem){
            setAddItem(true)
        }else{
            setAddItem(false)
            setAddManually(false)
        }
        console.log("addItem? ", addItem)
    }

    useEffect(() => {
        getUserList()
    },[itemAdded])



    return (
        <div className="App">           
            <div className="App-header">
                <div className='list' style={{ width: "90%"}}>

                    <div className='scannerDiv'>
                        <div className="bar-scanner">
                            <BarcodeScanner addManually={addManually} setAddManually={setAddManually} barcode2={barcode2} setBarcode2={setBarcode2} setAddItem={setAddItem} itemAdded={itemAdded} setItemAdded={setItemAdded} style={{marginBottom: 20}}/>
                        </div>

                        <Link to="/my-list">
                            <Fab 
                            style={{width: "40%", borderRadius: 10}} 
                            color="secondary"
                            onClick={onClick}
                            >
                                <ArrowBackIcon />Cancel
                            </Fab>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    )}

export default Scan;



