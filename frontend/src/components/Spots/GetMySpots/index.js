import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpots, deletingSpot } from '../../../store/spots';
import './GetMySpots.css';

export const MySpots = () => {
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false)
    const spots = useSelector(state => {
        return state.spots.allSpots
    });
    const spotsArr = Object.values(spots)
    useEffect(() => {
        dispatch(getMySpots(spotsArr)).then(() => setLoaded(true))
    }, [dispatch, spotsArr])

    const user = useSelector(state => state.session.user);
    const mySpots = spotsArr.filter(spot => spot.id === user.id)
    return (
        <>
            <div className='your-spots-container'>
                <h1>Your Spots</h1>
                <div className='add-spot-button'>
                    <NavLink to={`/spots/add`}>
                        <button>Add a Listing</button>
                    </NavLink>
                </div>
                <div className='individual-spot'>
                    {mySpots.map(spot => (
                        <NavLink to={`/spots/${spot.id}`}>
                            <h3>{spot.name}</h3>
                            <h3>★{spot.avgRating} · {spot.city}, {spot.state}</h3>
                            <img src={`${spot.previewImage}`} alt={'this is yours homie'} />
                            <NavLink to={`/spots/${spot.id}/edit`} >
                                <button>Edit Listing</button>
                            </NavLink>
                            <NavLink to={`/spots`}>
                                <button
                                    onClick={() => dispatch(deletingSpot(spot.id))}
                                >Delete Listing</button>

                            </NavLink>
                        </NavLink>

                    ))}
                </div>
            </div>
        </>
    )
}
