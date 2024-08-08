import React from 'react'
import "./Block.css"

const Block = ({currentItem }) => {

    const handleClick = (e) => {
        let state = e.target.parentElement.parentElement.children[1].children[0].style.display
        if(state === ""){
            state = "none"
        }
        console.log("state=" , state)
        if(state === 'none'){
            e.target.style.background = '#4aafac'
            e.target.parentElement.style.borderColor = "#35b1c3"
            e.target.innerHTML = "-"
            e.target.parentElement.parentElement.children[1].children[0].style.display = "block"
        }else{
            e.target.style.background = '#ff6f47'
            e.target.parentElement.style.borderColor = "#ff6f47"
            e.target.innerHTML = "+"
            e.target.parentElement.parentElement.children[1].children[0].style.display = "none"
        }
    }

  return (
    <div className='listItem'>
        <div className="itemLeft">{currentItem}</div>
        <button onClick={handleClick} className='itemRight'>+</button>
    </div>
  )
}

export default Block