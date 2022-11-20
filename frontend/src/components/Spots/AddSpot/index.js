import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addingSpot } from '../../../store/spots'
import './AddSpot.css'
import { useHistory } from 'react-router-dom'
const AddSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const [erorrsShow, setErrorsShown] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const arr = [];
        if (!name) arr.push('Must include name')
        if (!city) arr.push('Must include city')
        if (!state) arr.push('Must include state')
        if (!country) arr.push('Must include country')
        if (!description) arr.push('Must include description')
        if (!price) arr.push('Must include price')
        if (!url) arr.push('Must include url');
        if (!address) arr.push('Must include address');

        setErrors(arr)

    }, [name, address, city, state, country, lat, lng, description, price, url])

    const submit = async (e) => {
        e.preventDefault();
        setErrorsShown(true)
        setSubmitted(true)
        if (!errors.length) {
            const addedSpot = { address, city, state, country, lat: 42, lng: 42, name, description, price, url }
            const created = await dispatch(addingSpot(addedSpot))
            created.SpotImages = [{ url: url }]
            if (created) {
                setErrorsShown(false);
                history.push(`/spots/${created.id}`)

            }
        }
    }

    return (
        <div className='add-spot-form-container'>
            <div className='add-spot-form'>
                <form className='adding-spot' onSubmit={submit}>
                    <h2 className='intro'>
                        Let strangers live in your house!
                    </h2>
                    <div className='errors'>
                        {errors.length > 0 && submitted === true &&
                            errors.map(error =>
                                <li key={error}>{error}</li>)
                        }
                    </div>
                    <div className='form'>
                        <label className="add-spot-form-label">
                            Name
                            <input
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </label>
                        <label className="add-spot-form-label">

                            Address
                            <input
                                type='text'
                                value={address}
                                onChange={e => setAddress(e.target.value)} />
                        </label>
                        <label className="add-spot-form-label">

                            City
                            <input
                                type='text'
                                value={city}
                                onChange={e => setCity(e.target.value)} />
                        </label>
                        <label className="add-spot-form-label">

                            State
                            <input
                                type='text'
                                value={state}
                                onChange={e => setState(e.target.value)} />
                        </label>
                        <label className="add-spot-form-label">

                            Country
                            <input
                                type='text'
                                value={country}
                                onChange={e => setCountry(e.target.value)} />
                        </label>
                        <label className="add-spot-form-label">

                            Description
                            <input
                                type='text'
                                value={description}
                                onChange={e => setDescription(e.target.value)} />
                        </label>
                        <label className="add-spot-form-label">

                            Price per night
                            <input
                                type='number'
                                value={price}
                                onChange={e => setPrice(e.target.value)} />
                        </label>
                        <label className="add-spot-form-label">

                            Preview Image
                            <input
                                type='text'
                                value={url}
                                onChange={e => setUrl(e.target.value)} />
                        </label>
                    </div>
                    <button className='submit'>Create Spot</button>
                </form>
            </div>
        </div>
    )
}



export default AddSpot
