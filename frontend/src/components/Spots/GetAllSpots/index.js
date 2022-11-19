import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../../store/spots'
import './GetAllSpots.css';
import { NavLink } from 'react-router-dom'

export const GetAllSpots = () => {
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false)
    const spots = useSelector(state => {
        return state.spots.allSpots
    });
    useEffect(() => {
        dispatch(getAllSpots()).then(() => setLoaded(true))
    }, [dispatch]);
    if (!spots) return null
    const info = Object.values(spots).map(spot => {
        return (
            < div className="all-spot" >
                <NavLink to={`/spots/${spot.id}`} className="indi-spot-link">
                    <div className="indi-spots">
                        <div>
                            <img src={spot.previewImage} alt='thisdaimage' className="indi-spot-image" />
                        </div>
                        <div className="spot-info">
                            <div className="indi-spot-city-state">
                                <div className="city-state" key={spot.name}>
                                    {spot.city}, {spot.state}
                                </div>
                                <div className="indi-spot-stars">
                                    ★ {spot.avgRating}
                                </div>
                            </div>

                            <div className="indi-spot-availability">
                                Jan 10 - 15
                            </div>
                            <div className="indi-price-per-night">
                                <span className="indi-price"> ${spot.price} </span>night
                            </div>
                        </div>
                    </div>
                </NavLink>


            </div>
        )
    })
    return isLoaded && (
        <div className="get-all-spots-container">
            {info}
        </div>
    )
}
