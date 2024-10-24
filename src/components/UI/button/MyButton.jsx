import React, {useState} from "react";
import classes from './MyButton.css';
const MyButton = ({ onClick, children, className = '', ...props }) => {
    return (
        <button {...props} className={`custom-button ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}
export default MyButton