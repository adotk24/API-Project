import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { getAllSpots } from '../../store/spots';
import './SpotsPage.css';

export const SpotsPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.getAllSpots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])
    if (!spots) return null
    return (
        <h1>This has been connected</h1>
    )


}
