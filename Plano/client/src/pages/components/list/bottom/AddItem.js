import React from 'react'
import { Link } from "react-router-dom";

const AddItem = () => {
    return (
        <Link to="/scan-item">
            <div className="add-btn">
                <div className="inside-add-btn">New Item</div>
            </div>
        </Link>
    )
}

export default AddItem