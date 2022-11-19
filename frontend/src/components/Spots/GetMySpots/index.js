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
                <div className='intro'>
                    <h1 className='top-letters'>Your Spots</h1>
                    <NavLink to={`/spots/add`}>
                        <button className='add-listing-btn'>Add a Listing</button>
                    </NavLink>
                </div>
                <div className='my-spots-container'>
                    {spotsArr.map(spot => (
                        <div className='indi-my-spots' key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`} className='indi-my-spot-link'>
                                <div className='my-indi-spot-info'>
                                    <h3 className='my-indi-spot-name'>{spot.name}</h3>
                                    <h3 className='my-indi-spot-ratings'>{spot.country}</h3>
                                </div>
                                <img src={`${spot.previewImage}`} alt={'this is yours homie'} className='my-image' />
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
