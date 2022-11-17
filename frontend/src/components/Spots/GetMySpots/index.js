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

    return isLoaded && (
        <>
            <div className='your-spots-container'>
                <h1>Your Spots</h1>
                <div className='add-spot-button'>
                    <NavLink to={`/spots/add`}>
                        <button>Add a Listing</button>
                    </NavLink>
                </div>
                <div className='individual-spot'>
                    {spotsArr.map(spot => (
                        <div className='spot-detail' key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <h3>{spot.name}</h3>
                                <h3>★{spot.avgRating} · {spot.city}, {spot.state}</h3>
                                <img src={`${spot.previewImage}`} alt={'this is yours homie'} />
                            </NavLink>
                            <NavLink to={`/spots/${spot.id}/edit`} >
                                <button>Edit Listing</button>
                            </NavLink>
                            {/* <NavLink to={`/`}> */}
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const deleted = await dispatch(deletingSpot(spot.id));
                                    if (deleted) history.push('/')
                                }}>
                                {/* onClick={delSpot(spot.id)}> */}
                                Delete Listing </button>
                            {/* </NavLink> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
