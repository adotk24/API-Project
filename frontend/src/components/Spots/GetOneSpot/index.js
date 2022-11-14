import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../../store/spots';
import './GetOneSpot.css';
import { useParams } from 'react-router-dom';

export const GetOneSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false);
    const spot = useSelector(state => {
        return state.spots.spot
    })

    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(() => setLoaded(true))
    }, [dispatch, spotId])


    return isLoaded && (
        <h1>{spot.id}</h1>
    )
}
