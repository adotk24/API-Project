import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../../store/spots';
import './GetOneSpot.css';
import { useParams } from 'react-router-dom';
import { getReviewById } from '../../../store/reviews';

export const GetOneSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false);
    const spot = useSelector(state => {
        return state.spots.spot
    })
    const reviews = useSelector(state => {
        return state.reviews.allReviews
    })
    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(() => setLoaded(true))
    }, [dispatch, spotId])
    console.log('REVIEWS HERE', reviews)

    return isLoaded && (
        <div className='one-spot'>
            <div className='one-spot-container'>
                <div className='top-section'>
                    <h3>{spot.name}</h3>
                </div>
                <div className='sec-section'>
                    <h4>★{spot.avgRating}·{spot.numReviews}reviews·{spot.city}, {spot.state}</h4>
                </div>
                <div className='photos'>
                    <img src={spot.SpotImages[0].url} alt='thingy' />
                </div>
                <div className='left-description'>
                    <h3>Entire home hosted by {spot.Owner.firstName}</h3>
                    <div className='left-bottom'>
                        <h3>Self check-in</h3>
                        <h4>Check yourself in with the keypad</h4>
                    </div>

                </div>
            </div>
            <div className='review-containers'>
                <h3>★{spot.avgRating}·{spot.numReviews}reviews</h3>
            </div>
        </div>
    )
}
