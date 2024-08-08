import React, { useState } from 'react'
//import { Fab, TextField, TextareaAutosize, Grid } from '@material-ui/core'
//import { ArrowBack, GetApp } from '@material-ui/icons'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import "./Items.css"

function Items({ setUserList, uniqueId, itemDeleted, setItemDeleted, userList, currentItem }) {
    const [cookie, setCookie, removeCookie] = useCookies(['user'])
    const userId = cookie.userId

    async function handleClick(item) {
        try {
            console.log("delete clicked!")
            console.log("item: ", item)
            const response = await axios.patch('http://localhost:5000/user/deleteItem', {
                id: userId,
                itemId: item._id
            })

            console.log("response: ", response)
            setItemDeleted(itemDeleted + 1)
        } catch (error) {
            console.log(error)
        }
    }


    var today = new Date();
    function checkTime(item) {
        var minutes = Math.floor((item.getTime() - today.getTime()) / 60000);
        var hours = (minutes / 60);
        var days = hours / 24;

        if (days <= 0) {
            return 0;
        } else if (days <= 1) {
            return 1;
        } else {
            return 2;
        }
    }


    const soonExpire = (item) => {
        const val = checkTime(item);
        if (val === 0) {
            return "listItem2Danger"
        } else if (val === 1) {
            return "listItem2Warning"
        } else {
            return "listItem2"
        }
    }

    const addDate = (item) => {
        const newDate = new Date(item.expDate)
        return (
            <div className={soonExpire(newDate)}>
                <div className='itemLeft2' style={{ color: "black" }}>{newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + (newDate.getYear() - 100)}</div>
                <div onClick={() => handleClick(item)} className='itemRight2'>X</div>
            </div>
        )
    }



    return (
        <div>
            <div className='items-list' key={uniqueId}>
                {
                    userList.map((item) => {
                        if (item.barcode === currentItem) {
                            return (
                                <div className='listItemParent2'>
                                    {addDate(item)}
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>

    )
}

export default Items;


