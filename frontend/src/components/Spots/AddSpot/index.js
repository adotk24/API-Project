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
        if (!address) arr.push('Must include address');
        if (!city) arr.push('Must include city')
        if (!state) arr.push('Must include state')
        if (!country) arr.push('Must include country')
        if (!description) arr.push('Must include description')
        if (!price) arr.push('Must include price')
        if (!url) arr.push('Must include url');

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
                <h2 className='intro'>
                    Let strangers live in your house!
                </h2>
                <div className='errors'>
                    {errors.length > 0 && submitted === true &&
                        errors.map(error =>
                            <li key={error}>{error}</li>)
                    }
                </div>
                <form className='adding-spot' onSubmit={submit}>
                    <div className='form'>
                        <label className="add-spot-form-label">
                            Name
                        </label>
                        <input
                            className='add-spot-input'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label className="add-spot-form-label">

                            Address
                        </label>
                        <input
                            className='add-spot-input'

                            type='text'
                            value={address}
                            onChange={e => setAddress(e.target.value)} />
                        <label className="add-spot-form-label">

                            City
                        </label>
                        <input
                            className='add-spot-input'

                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <label className="add-spot-form-label">

                            State
                        </label>
                        <input
                            className='add-spot-input'

                            type='text'
                            value={state}
                            onChange={e => setState(e.target.value)} />
                        <label className="add-spot-form-label">

                            Country
                        </label>
                        <input
                            className='add-spot-input'

                            type='text'
                            value={country}
                            onChange={e => setCountry(e.target.value)} />
                        <label className="add-spot-form-label">

                            Description
                        </label>
                        <input
                            className='add-spot-input-description'

                            type='text'
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                        <label className="add-spot-form-label">

                            Price per night
                        </label>
                        <input
                            className='add-spot-input'
                            min='0'
                            max='100000'
                            type='number'
                            value={price}
                            onChange={e => setPrice(e.target.value)} />
                        <label className="add-spot-form-label">

                            Preview Image
                        </label>
                        <input
                            className='add-spot-input'

                            type='text'
                            value={url}
                            onChange={e => setUrl(e.target.value)} />
                        <button className='submit'>Create Spot</button>
                    </div>
                </form>
            </div >
        </div >
    )
}



export default AddSpot
