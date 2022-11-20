import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';
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
                    <NavLink exact to="/" className='home-button'>Home</NavLink>
                </li>
                <li>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
    );
}

export default Navigation;
