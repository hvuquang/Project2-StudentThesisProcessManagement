import React from 'react';
import "./Toast.css"

const Toast = ({ message }) => {
    return (
        <div className='toastStyle'>
            <div className='square'></div>
            <div>
                <div className='title'>Success!</div>
                <div className='content'>{message}</div> 
            </div>
        </div>
    );
};

export default Toast;