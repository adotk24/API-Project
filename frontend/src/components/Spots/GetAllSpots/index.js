import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../../store/spots'
import './GetAllSpots.css';

export const GetAllSpots = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => {
        return state.spots.allSpots
    });

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);
    const info = Object.values(spots)
    console.log('this is my spots', info)
    // if (!spots.length) return null

    return (
        <div className="allSpots">
            {info.map(spot => (
                <div className="individual-spot">
                    <img src={spot.previewImage} />
                    <div className="stars">
                        ★ {spot.avgRating}
                    </div>
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
            ))}
        </div>
    )
}
