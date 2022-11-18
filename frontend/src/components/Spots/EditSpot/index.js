import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSpot, getOneSpot } from '../../../store/spots'
import './EditSpot.css';
import { NavLink, useParams, useHistory } from 'react-router-dom'

const EditSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    // const spots = useSelector(state => state.spots.allSpots)
    const oneSpot = useSelector(state => state.spots.spot)


    const user = useSelector(state => state.session.user)
    // const spotsArr = Object.values(spots);
    // const editedSpotArr = spotsArr.filter(spot => spot.id === user.id)
    // const editedSpot = editedSpotArr[0]


    const [address, setAddress] = useState(oneSpot.address);
    const [city, setCity] = useState(oneSpot.city);
    const [state, setState] = useState(oneSpot.state);
    const [country, setCountry] = useState(oneSpot.country);
    const [lat, setLat] = useState(oneSpot.lat);
    const [lng, setLng] = useState(oneSpot.lng);
    const [name, setName] = useState(oneSpot.name);
    const [description, setDescription] = useState(oneSpot.description);
    const [price, setPrice] = useState(oneSpot.price);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        setAddress(oneSpot.address);
        setCity(oneSpot.city);
        setState(oneSpot.state);
        setCountry(oneSpot.country);
        setLat(oneSpot.lat);
        setLng(oneSpot.lng);
        setName(oneSpot.name);
        setPrice(oneSpot.price);
        setDescription(oneSpot.description);

    }, [oneSpot])

    const submit = async (e) => {
        e.preventDefault();
        const spot = { address, city, state, country, lat, lng, name, description, price };
        dispatch(editSpot(spot, spotId));
        history.push(`/spots/${spotId}`)
    };



    return (
        <form className="edit-spot" onSubmit={submit}>
            <div className="edit-spot-container">
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
            </div>
        </form>
    )
}
export default EditSpot
