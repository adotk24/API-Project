import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpots } from '../../../store/spots';
import './GetMySpots.css';

export const MySpots = () => {
    const dispatch = useDispatch();
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
                <h1>Your Spots</h1>
                <div className='individual-spot'>
                    {spotsArr.map(spot => (
                        <NavLink to={`/spots/${spot.id}`}>
                            <img src={`${spot.previewImage}`} alt={'this is yours homie'} />
                            <h3>{spot.name}</h3>
                            <h3>{spot.city}, {spot.state}</h3>
                            <NavLink to={`/spots/${spot.id}/edit`}>
                                <button>Edit Listing</button>
                            </NavLink>
                        </NavLink>

                    ))}
                </div>
            </div>
        </>
    )
}
