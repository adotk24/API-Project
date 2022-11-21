import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';
import logo from '../../pictures/airbnb-logo.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                {/* <LoginFormModal />
                <SignupFormModal /> */}
                <ProfileButton user={null} />

            </>
        );
    }

    return (
        <div className='nav-bar'>
            <ul className='nav-bar-unordered-list'>
                <li className=''>
                    <NavLink exact to="/" className='home-button'>
                        <img className='navigation-logo' src={logo} alt='Home' />
                    </NavLink>
                </li>
                <li>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
    );
}

export default Navigation;
