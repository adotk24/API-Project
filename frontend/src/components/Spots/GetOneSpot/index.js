import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../../store/spots';
import './GetOneSpot.css';

export const GetOneSpot = () => {
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false);
    const spot = useSelector(state => {
        return state.spots.spot
    })

    useEffect(() => {
        dispatch(getOneSpot()).then(() => setLoaded(true))
    }, [dispatch])


    return isLoaded && (
        <h1>{spot.id}</h1>
    )
}
