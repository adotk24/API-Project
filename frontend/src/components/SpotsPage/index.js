import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { getAllSpots } from '../../store/spots';
import './SpotsPage.css';

export const SpotsPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.allspots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])
    if (!spots) return null
    return (
        <div className='spots'>
            {spots.map(spot => {
                return (
                    <div className='testing'>
                        hello
                    </div>
                )
            })}
        </div>
    )


}
