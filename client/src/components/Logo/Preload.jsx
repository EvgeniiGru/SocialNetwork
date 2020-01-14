import React from 'react'
import Preload from ".././Logo/preload.gif";

const Preloader = () => {
    return (
        <div className="preloader_background">
            <img src={Preload} className="preloader" />
        </div>)
};

export default Preloader;