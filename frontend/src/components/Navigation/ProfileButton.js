import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    console.log('THIS IS THE USER', user)
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };
    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {
                showMenu && (
                    <ul className="profile-dropdown">
                        <li key={user.username}>{user.username}</li>
                        <li key={user.email}>{user.email}</li>
                        <NavLink to='/spots/mine'>
                            <button>Your Spots</button>
                        </NavLink>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                )
            }
        </>
    );
}

export default ProfileButton;
