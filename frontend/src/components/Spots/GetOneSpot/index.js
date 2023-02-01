import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../../store/spots';
import './GetOneSpot.css';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getReviewById, deleteReview } from '../../../store/reviews';
import { getBookingsBySpot } from '../../../store/bookings';
import moment from 'moment';
import AddBooking from '../../Bookings/AddBooking/AddBooking';
import nouserpic from './nouserpic.png'


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

        <div className='one-spot'>
            <div className='da-spot-container'>
                <div className='top-section'>
                    <div className='spot-name'>{spot.name}
                    </div>
                    <div className='sec-section'>
                        {spot?.numReviews == 1 &&
                            <div className='rating'>★ {spot.avgRating} · {spot.numReviews} review
                            </div>
                        }
                        {spot?.numReviews > 1 || spot?.numReviews == 0 &&
                            <div className='rating'>★ {spot.avgRating} · {spot.numReviews} reviews
                            </div>
                        }
                        <div className='literallyjustadot'>
                            ·
                        </div>
                        <div className='daplace'>
                            {spot.city},  {spot.state}
                        </div>
                    </div>
                </div>
                <div className='photos'>
                    <img src={spot?.SpotImages[0]?.url} alt='thingy' className='spotImg' />
                </div>
            </div>
            <div className='mid-section'>
                <div className='spot-information'>
                    <div className='first-left'>
                        <div className='first-left-first'>Entire home hosted by {spot.Owner?.firstName}</div>
                        <img src={nouserpic} className='user-pic' alt='profilepic'></img>
                    </div>
                    <div className='second-left'>
                        <div className='self-check-in'>
                            <div className='door-img'>
                                <i class="fa-solid fa-door-open"></i>
                            </div>
                            <div className='checkin-text'>
                                <div className='checkin-text-first'>
                                    Self Check-In
                                </div>
                                <div className='checkin-text-last'>
                                    Check yourself in with the lockbox.
                                </div>
                            </div>
                        </div>
                        <div className='cancellation'>
                            <div className='cancel-img'>
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div className='cancel-text'>
                                <div className='cancel-text-first'>
                                    Free cancellation before Dec 31.
                                </div>
                                <div className='cancel-text-last'>
                                    Only if you hire me though.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='third-left'>
                        <img src={'https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'} className='aircover' />
                        <div className='third-left-desc'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                    </div>
                    <div className='fourth-left'>

                        <div className='fourth-left-desc'>{spot.description}</div>
                    </div>
                </div>
                <div className='bookingContainer'>
                    <AddBooking bookings={bookings} spot={spot} reviews={reviewsArr} />
                </div>
            </div>
            <div className='review-containers'>
                {spot?.numReviews > 1 || spot?.numReviews == 0 &&
                    <div className='review-header'>

                        ★ {spot.avgRating} · {spot.numReviews} reviews
                    </div>
                }
                {spot?.numReviews == 1 &&
                    <div className='review-header'>

                        ★ {spot.avgRating} · {spot.numReviews} review
                    </div>

                }
                {(!userReviewArr) && (user?.id !== spot.Owner?.id) && (user) &&
                    <div className='review-top-part'>
                        <NavLink to={`/spots/${spot.id}/review`}>
                            <button className="add-review">
                                Add Review
                            </button>
                        </NavLink>
                    </div>
                }


                <div className='individual-review-storage'>
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


        </div >
    )
}
