import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='navigation'>
            <li>
                <NavLink exact to="/">
                    <div className='logo_container'>
                        <img src={logo} alt="logo" className='nav-logo' />
                        <span> J-Airbnb </span>
                    </div>
                </NavLink>
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
