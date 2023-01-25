import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../../store/spots';
import './GetOneSpot.css';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getReviewById, deleteReview } from '../../../store/reviews';
import { getBookingsBySpot } from '../../../store/bookings';
import moment from 'moment';
import AddBooking from '../../Bookings/AddBooking/AddBooking';



export const GetOneSpot = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false);
    const spot = useSelector(state => state.spots.spot);
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.allReviews)
    const bookings = useSelector(state => Object.values(state.bookings.allBookings))
    useEffect(() => {
        dispatch(getReviewById(spotId)).then(() => {
            dispatch(getBookingsBySpot(spotId))
        }).then(() => setLoaded(true))
    }, [dispatch, spotId])
    // const submit = async (e) => {
    //     e.preventDefault();
    //     await dispatch deleteReview(e.id);
    //     history.pushState()
    // }
    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [spotId, reviews, dispatch])
    const delReview = async (e, id) => {
        e.preventDefault();
        await dispatch(deleteReview(id))
        // await history.push('/')
    }

    const reviewsArr = Object.values(reviews)
    let userReviewArr = reviewsArr.find(item => item.userId === user?.id)
    // const owner = spot.Owner;


    const formatDate = dateString => {
        return moment(dateString).format("MMMM, YYYY")
    }


    return isLoaded && spot && spot.SpotImages && (
        <>
            <div className='one-spot'>
                <div className='da-spot-container'>
                    <div className='top-section'>
                        <h1>{spot.name}</h1>
                    </div>
                    <div className='sec-section'>
                        <h3>★ {spot.avgRating} · {spot.numReviews} reviews · {spot.city},  {spot.state}</h3>
                    </div>
                    <div className='photos'>
                        <img src={spot?.SpotImages[0]?.url} alt='thingy' className='spotImg' />

                    </div>
                    <div className='left-description'>
                        <h3>Entire home hosted by {spot.Owner?.firstName}</h3>
                        <div className='left-bottom'>
                            <h3>Self check-in</h3>
                            <h4 className='desc'>{spot.description}</h4>
                        </div>

                    </div>
                </div>
            </div >
            <div className='review-containers'>
                {(!userReviewArr) && (user?.id !== spot.Owner?.id) && (user) &&
                    <div className='review-top-part'>
                        <h3 className='bot-reviews-count'>★{spot.avgRating}·{spot.numReviews}reviews</h3>
                        <NavLink to={`/spots/${spot.id}/review`}>
                            <button className="add-review">
                                Add a Review
                            </button>
                        </NavLink>
                    </div>
                }
                <div className='bookingContainer'>
                    <AddBooking bookings={bookings} spot={spot} />
                </div>


                <div className='individual-review-storage'>
                    <h3>★{spot.avgRating}·{spot.numReviews}reviews</h3>
                    {reviewsArr.map(review => (
                        <div className='individual-review'>

                            <h4 className='review-firstName'>{review.User.firstName}</h4>
                            <h4 className='review-date'>{formatDate(review.createdAt)}</h4>
                            <p className='actual-review'>{review.review}</p>

                            {(userReviewArr?.User.id === review.User?.id &&
                                <button
                                    className='delete-review-btn'
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await dispatch(deleteReview(review.id))
                                        // history.push(`/spots/${spot.id}`)
                                    }
                                    }>
                                    Delete Review
                                </button>
                            )}
                        </div>

                    ))}

                </div>
            </div>

        </>
    )
}
