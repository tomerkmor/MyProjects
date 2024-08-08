import React from 'react'

import './Search.css'

const Search = ({setUserText}) => {

    const handleChange = (e) => {
        const value = e.target.value.toLowerCase()
        setUserText(value)
    }


    return (
        <div className="search-wrapper">
            <label for="search"></label>
            <input 
                type="search"
                id="search"
                placeholder='Search for a product'
                onChange={handleChange}
                autocomplete="off"
            />
        </div>
    )
}

export default Search