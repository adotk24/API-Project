import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSpot, getOneSpot } from '../../../store/spots'
import './EditSpot.css';
import { NavLink, useParams, useHistory } from 'react-router-dom'

const EditSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const spot = useSelector(state => state.spots)




    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([]);

    const submit = async (e) => {
        e.preventDefault();
        const spot = { address, city, state, country, lat, lng, name, description, price };
        const editedSpot = await dispatch(editSpot(spot, spot.id));
        history.push(`/spots/${spot.id}`)
    };

    useEffect(() => {
        const arr = [];


        setErrors(arr)

    }, [errors])

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
                    type='text'
                    name='lat'
                    value={lat}
                    onChange={e => setLat(e.target.value)} />
            </label>
            <h2>Enter a longitude</h2>
            <label>Longitude
                <input
                    type='text'
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
                    type='text'
                    name='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)} />
            </label>
            <button type='submit'>Submit Form</button>
        </form>
    )
}
export default EditSpot
