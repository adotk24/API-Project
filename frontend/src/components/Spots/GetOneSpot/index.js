import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../../store/spots';
import './GetOneSpot.css';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getReviewById, deleteReview } from '../../../store/reviews';

export const GetOneSpot = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false);
    const spot = useSelector(state => {
        return state.spots.spot
    });
    const user = useSelector(state => {
        return state.session.user
    })
    const reviews = useSelector(state => {
        return state.reviews.allReviews
    })

    useEffect(() => {
        dispatch(getReviewById(spotId)).then(() => setLoaded(true))
    }, [dispatch, spotId])
    // const submit = async (e) => {
    //     e.preventDefault();
    //     await dispatch deleteReview(e.id);
    //     history.pushState()
    // }
    // console.log('Spots Owner First Name', spot)
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
    // console.log('THIS IS THE ONE I NEED', spot.Owner.firstName)
    // const owner = spot.Owner;
    // console.log('THIS SHOULD BE THE SAME', owner.firstName)
    if (!spot) return null
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
                            <h4>Check yourself in with the keypad</h4>
                        </div>

                    </div>
                </div>
                <div className='review-containers'>
                    {(!userReviewArr) && (user?.id !== spot.Owner?.id) && (user) &&
                        <NavLink to={`/spots/${spot.id}/review`}>
                            <button>
                                Add a Review
                            </button>
                        </NavLink>
                    }
                    <h3>★{spot.avgRating}·{spot.numReviews}reviews</h3>
                    {reviewsArr.map(review => (
                        <div className='individual-spot'>

                            <h4>{review.User.firstName}</h4>
                            <h4>November 2022</h4>
                            <p>{review.review}</p>

                            {(userReviewArr?.User.id === review.User?.id &&
                                <button onClick={async (e) => {
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

                </div >

            </div>

        </>
    )
}
