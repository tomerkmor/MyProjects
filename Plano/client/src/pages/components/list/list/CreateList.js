import React, {useState} from 'react'
import Items from './Items'
import Block from './Block';


function CreateList({userText , itemDeleted , setItemDeleted , userList , setUserList}) {
    let previousVal = -1;
    const [uniqueId , setUniqueId] = useState(0)

    return (
        <div>
            { 
                userList.map((item) => {
                    if((item).name.toLowerCase().includes(userText)) {
                        let currentVal = item.barcode;

                        if(previousVal !== currentVal){ // we encounter a new barcode item
                            previousVal = item.barcode;
                            return (
                            <div className='item ' key={previousVal}>
                                <div className='listItemParent'>
                                    <Block currentItem={item.name} />
                                    <Items setUserList={setUserList} uniqueId={uniqueId} itemDeleted={itemDeleted} setItemDeleted={setItemDeleted}  userList={userList} currentItem={currentVal}/>
                                </div>
                            </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}

export default CreateList;


