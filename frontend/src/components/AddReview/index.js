import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addingReview } from '../../store/reviews';
import './AddReview.css';
import { useParams, useHistory } from 'react-router-dom';


export const AddReview = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const something = useSelector(state => state.reviews.review)
    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state);
    console.log('FIND THE SPOT SOMEWHERE HERE', spot)
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState([]);
    const [errorsShow, setErrorsShown] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [stars, setStars] = useState(1)

    useEffect(() => {
        const arr = [];
        if (!stars) arr.push('Must include stars');
        if (!review) arr.push('Must include review');
        setErrors(arr)

    }, [stars, review]);

    const submit = async (e) => {

        e.preventDefault();
        setErrorsShown(true);
        setSubmitted(true);
        if (!errors.length) {
            const addedReview = { stars, review };
            const created = await dispatch(addingReview(addedReview, spotId));
            setErrorsShown(false);
            history.push(`/spots/${spot.spots.spot.id}`)
        }

    }


    return (
        <>
            <div className='review-container'>
                <div className='review-form'>
                    <h1 className='intro'>
                        Add a Review!
                    </h1>
                    {errors.length > 0 && submitted === true &&
                        errors.map(error =>
                            <li className='review-error-items' key={error}>{error}</li>)}
                    <form className='add-review' onSubmit={submit}>
                        <label>
                            Stars
                            <input
                                className='stars-input'
                                type='number'
                                value={stars}
                                min='1'
                                max='5'
                                onChange={e => setStars(e.target.value)} />
                        </label>
                        <label className='leave-it-here'>
                            <div className='leave-it-here-text'>Leave it here!</div>
                            <input
                                className='review-description'
                                type='text'
                                value={review}
                                onChange={e => setReview(e.target.value)} />
                        </label>
                        <button className='submit'>
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </>
    )




}
