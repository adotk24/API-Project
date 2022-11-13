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

    return (
        <NavLink key={spots.id} to={`/spots${spots.id}`}>
            <div className='spot-check'>
                spots
            </div>
        </NavLink>
    )


}
