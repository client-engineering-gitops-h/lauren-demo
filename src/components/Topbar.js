import React from 'react';
import HertzLogo from '../assets/hertz-dark-logo.png';
import { Icon, Button } from '@blueprintjs/core';
import NavMenu from './NavMenu';

const Topbar=() => {
    return( 
        <div className='top-bar'>
            <div>
                <img className='logo' src={HertzLogo} alt='hertz logo'/>
            </div>
            <div className='menu-items'>
                <Icon style={{paddingRight:"15px"}} icon="user" size={20}/>
                <NavMenu />
                
        </div>
        </div>


    )
}

export default Topbar;