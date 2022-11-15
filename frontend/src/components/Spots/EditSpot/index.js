import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSpot, getOneSpot } from '../../../store/spots'
import './EditSpot.css';
import { NavLink, useParams, useHistory } from 'react-router-dom'

const EditSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const spots = useSelector(state => state.spots.allSpots)
    const user = useSelector(state => state.session.user)
    const spotsArr = Object.values(spots);
    const editedSpotArr = spotsArr.filter(spot => spot.id === user.id)
    const editedSpot = editedSpotArr[0]


    const [address, setAddress] = useState(editedSpot.address);
    const [city, setCity] = useState(editedSpot.city);
    const [state, setState] = useState(editedSpot.state);
    const [country, setCountry] = useState(editedSpot.country);
    const [lat, setLat] = useState(editedSpot.lat);
    const [lng, setLng] = useState(editedSpot.lng);
    const [name, setName] = useState(editedSpot.name);
    const [description, setDescription] = useState(editedSpot.description);
    const [price, setPrice] = useState(editedSpot.price);
    const [errors, setErrors] = useState([]);

    console.log('THIS IS THE EDIT SPOT FUNCTION', editSpot)
    const submit = async (e) => {
        e.preventDefault();
        const spot = { address, city, state, country, lat, lng, name, description, price };
        dispatch(editSpot(spot, editedSpot.id));
        history.push(`/spots/${editedSpot.id}`)
    };



    return (
        <form className="edit-spot" onSubmit={submit}>
            <h2>Enter a Name</h2>
            <label>Name
                <input
                    type='text'
                    name='address'
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </label>
            <h2>Enter an Address</h2>
            <label>Address
                <input
                    type='text'
                    name='address'
                    value={address}
                    onChange={e => setAddress(e.target.value)} />
            </label>
            <h2>Enter a city</h2>
            <label>City
                <input
                    type='text'
                    name='city'
                    value={city}
                    onChange={e => setCity(e.target.value)} />
            </label>
            <h2>Enter a state</h2>
            <label>State
                <input
                    type='text'
                    name='state'
                    value={state}
                    onChange={e => setState(e.target.value)} />
            </label>
            <h2>Enter a country</h2>
            <label>Country
                <input
                    type='text'
                    name='country'
                    value={country}
                    onChange={e => setCountry(e.target.value)} />
            </label>
            <h2>Enter a latitude</h2>
            <label>Latitude
                <input
                    type='number'
                    name='lat'
                    value={lat}
                    onChange={e => setLat(e.target.value)} />
            </label>
            <h2>Enter a longitude</h2>
            <label>Longitude
                <input
                    type='number'
                    name='lng'
                    value={lng}
                    onChange={e => setLng(e.target.value)} />
            </label>
            <h2>Enter a description</h2>
            <label>Description
                <input
                    type='text'
                    name='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
            </label>
            <h2>Enter a price</h2>
            <label>Price
                <input
                    type='number'
                    name='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)} />
            </label>
            <button type='submit'>Submit Form</button>
        </form>
    )
}
export default EditSpot
