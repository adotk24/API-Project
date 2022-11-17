import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addingReview } from '../../store/reviews';
import './AddReview.css';
import { useParams, useHistory } from 'react-router-dom';


export const AddReview = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const something = useSelector(state => state.reviews.review)
    const user = useSelector(state => state.session.user);

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
            const created = await dispatch(addingReview(addedReview));
            setErrorsShown(false);
            // history.push(`/spots/${created.id}`)
        }

    }


    return (
        <>
            <h1>testing</h1>
            <div className='review-form'>
                <form className='add-review' onSubmit={submit}>
                    <h2 className='intro'>
                        Add a Review!
                    </h2>
                </form>
            </div>
        </>
    )




}
