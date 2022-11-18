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

    const delSpot = async (e, id) => {
        console.log('THIS HIT',)
        console.log('THIS IS THE EVENT ID', id)
        e.preventDefault();
        const deleted = await dispatch(deletingSpot(id));
        if (deleted) history.push('/')
    }
    console.log('THIS HIT', spots)
    return isLoaded && (
        <>
            <div className='intro'>
                <h1 className='top-letters'>Your Spots</h1>
                <NavLink to={`/spots/add`}>
                    <button className='add-listing-btn'>Add a Listing</button>
                </NavLink>
            </div>
            <div className='your-spots-container'>
                <div className='indi-base-container'>
                    {spotsArr.map(spot => (
                        <div className='spot-detail' key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`} className='nav-link'>
                                <h3>{spot.name}</h3>
                                <h3>★{spot.avgRating} · {spot.city}, {spot.state}</h3>
                                <img src={`${spot.previewImage}`} alt={'this is yours homie'} className='your-image' />
                            </NavLink>
                            <NavLink to={`/spots/${spot.id}/edit`} >
                                <button>Edit Listing</button>
                            </NavLink>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const deleted = await dispatch(deletingSpot(spot.id));
                                    if (deleted) history.push('/')
                                }}>
                                Delete Listing </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
