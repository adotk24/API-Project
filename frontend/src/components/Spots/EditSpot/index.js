import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSpot } from '../../../store/spots'
import './EditSpot.css';
import { NavLink } from 'react-router-dom'

export const EditSpot = () => {
    const dispatch = useDispatch();
    const spot = useSelector(state => state);
    console.log('THIS IS THE SPOT', spot)
    return (
        <h1>testing</h1>
    )
}
