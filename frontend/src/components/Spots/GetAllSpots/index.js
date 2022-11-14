import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../../store/spots'
import './GetAllSpots.css';

export const GetAllSpots = () => {
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false)
    const spots = useSelector(state => {
        return state.spots.allSpots
    });

    useEffect(() => {
        dispatch(getAllSpots()).then(() => setLoaded(true))
    }, [dispatch]);
    const info = Object.values(spots)

    return isLoaded && (
        <div className="allSpots">
            <div className="base-container">
                {info.map(spot => (
                    <div className="individual-spot">
                        <img src={spot.previewImage} alt='thisdaimage' className="image" />
                        <div className="description">
                            <div className="left-side">
                                <div className="city-state">
                                    {spot.city}, {spot.state}
                                </div>
                                <div className="availability">
                                    Jan 10 - 15
                                </div>
                                <div className="price">
                                    ${spot.price} night
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="stars">
                                    ★ {spot.avgRating}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div >
    )
}
