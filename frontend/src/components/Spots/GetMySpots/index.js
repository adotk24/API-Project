import { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpots, deletingSpot } from '../../../store/spots';
import './GetMySpots.css';

export const MySpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setLoaded] = useState(false)
    const spots = useSelector(state => {
        return state.spots.allSpots
    });
    const spotsArr = Object.values(spots)
    useEffect(() => {
        dispatch(getMySpots()).then(() => setLoaded(true))
    }, [dispatch])


    return isLoaded && (
        <>
            <div className='your-spots-container'>
                <h1 className='your-spots-top-message'>Your Spots</h1>
                <NavLink to={`/spots/add`}>
                    <button className='add-listing-btn'>Add a Listing</button>
                </NavLink>
                <div className='your-spots'>
                    {spotsArr.map(spot => (
                        <div className='your-owned-spots' key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`} className='spots-link'>
                                <div className='your-owned-indi-spots'>
                                    <div>
                                        <img src={`${spot.previewImage}`} alt={'this is yours homie'} className='your-indi-spot-image' />
                                    </div>
                                    <div className='your-indi-spot-info'>
                                        <div className='owned-indi-spot-name'>{spot.name}</div>
                                        <div className='user-address-star'>{spot.state}, {spot.country}</div>
                                        <div className='indi-spot-price'>${spot.price}</div>
                                    </div>
                                </div>
                            </NavLink>
                            <div className='mySpotButtons'>
                                <NavLink to={`/spots/${spot.id}/edit`} >
                                    <button className='edit-listing'>Edit Listing</button>
                                </NavLink>
                                <button
                                    className='delete-listing'
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const deleted = await dispatch(deletingSpot(spot.id));
                                        if (deleted) history.push('/')
                                    }}>
                                    Delete Listing </button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}
