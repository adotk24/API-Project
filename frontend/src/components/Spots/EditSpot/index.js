import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSpot, getOneSpot } from '../../../store/spots'
import './EditSpot.css';
import { NavLink, useParams, useHistory } from 'react-router-dom'

export const EditSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots)
    const [isLoaded, setLoaded] = useState(false)
    console.log('THIS IS THE SPOT ID', spotId)
    useEffect(() => {
        dispatch(editSpot(spot, spotId)).then(() => setLoaded(true))
    }, [dispatch, spot, spotId]);

    console.log('**********************************', 'IS ANYONE HERE')
    return (
        <h1>testing</h1>
    )
}
