import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../../store/spots'
import './GetAllSpots.css';

export const GetAllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.another))
    console.log('This is the spots object', spots)
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])
    // if (!spots.length) return null

    return (
        <h1>hi</h1>
    )
}
