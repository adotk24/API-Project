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
            < div className="getAllSpots" >
                <NavLink to={`/spots/${spot.id}`} className="getAllSpots-link">
                    <div className="getAllSpots-indi-spot">
                        <div>
                            <img src={spot.previewImage} alt='thisdaimage' className="indi-spot-image" />
                        </div>
                        <div className="indi-spot-info">
                            <div className="top">
                                <div className="ind-city-state" key={spot.name}>
                                    {spot.city}, {spot.state}
                                </div>
                                <div className="indi-stars">
                                    ★ {spot.avgRating}
                                </div>
                            </div>

                            <div className="indi-availability">
                                Jan 10 - 15
                            </div>
                            <div className="indi-price">
                                <span className="bold-price"> ${spot.price} </span>night
                            </div>
                        </div>
                    </div>
                </NavLink>


            </div>
            // </div >
        )
    })
    return isLoaded && (
        <div className="getAllSpots-container">
            {info}
        </div>
    )
}
