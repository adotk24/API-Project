import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';
import logo from '../../pictures/airbnb-logo.png'
import './Navigation.css';
import { set } from 'date-fns';

function Navigation({ isLoaded }) {
    const [showMenu, setShowMenu] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [focused, setFocused] = useState(false)

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <ProfileButton user={null} />
            </>
        );
    }

    const [spotId, setSpotId] = useState("");
    const [wordEntered, setWordEntered] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const data = useSelector(state => state.spots.allSpots);
    const dataArr = Object.values(data)

    const handleFilter = (e) => {
        const query = e.target.value;
        setWordEntered(query);
        const newFilter = dataArr.filter((d) => {
            if (d.city.toLowerCase().includes(query.toLowerCase()) || d.state.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase()) || d.name.toLowerCase().includes(query.toLowerCase()) || d.address.toLowerCase().includes(query.toLowerCase())) {
                setSpotId(d.id)
                return d
            };
        });

        if (query === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setWordEntered("");
        setFilteredData([]);
    };


    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className='nav-bar'>
            <div className='nav-bar-x-list'>
                <div className=''>
                    <NavLink exact to="/" className='home-button'>
                        <img className='navigation-logo' src={logo} alt='Home' />
                    </NavLink>
                </div>

                <div className="search-container">
                    <div className="search">
                            <input
                                type="text"
                                placeholder="Search"
                                value={wordEntered}
                                onChange={handleFilter}
                                className="search-input"
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                            />
                        <div className="searchIcon">
                            {filteredData.length === 0 ?
                                <i className="fa-solid fa-magnifying-glass"></i>
                                :
                                <div className="search-x" onClick={clearInput}>
                                    <div className='x'>
                                        x
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                    {filteredData.length != 0 && focused && (
                        <div className="search-result">
                            {filteredData.slice(0, 15).map(value => {
                                return (
                                    <a className="search-item" href={`/spots/${value.id}`} target="_blank">
                                        <div className='indi-city'>
                                            <img className="search-image" src={value.previewImage} />
                                            <div>
                                                <div> {value.name} </div>
                                                <div className='search-city-state'> at {value.city} {value.state}</div>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className='navbar-right'>
                    <div className='about-page'>
                        <button className='aboutPageBtn'>
                            <NavLink to={`/about`} className='aboutUsLink'>About</NavLink>
                        </button>
                    </div>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </div>
    );
}

export default Navigation;
