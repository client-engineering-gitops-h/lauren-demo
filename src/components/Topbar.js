import React from 'react';
import HertzLogo from '../assets/hertz-dark-logo.png';

const Topbar=() => {
    return( 
        <div className='top-bar'>
            <img className='logo' src={HertzLogo} alt='hertz logo'/>
        </div>

    )
}

export default Topbar;