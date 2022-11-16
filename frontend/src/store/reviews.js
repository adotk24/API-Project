import { csrfFetch } from "./csrf";
const GET_REVIEWS = 'reviews/GET_REVIEW'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const loadReviews = reviews => {
    return {
        type: GET_REVIEWS, reviews
    }
}

const addReview = review => {
    return {
        type: ADD_REVIEW, review
    }
}

const delReview = review => {
    return {
        type: DELETE_REVIEW, review
    }
}

export const getCurrentReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current');
    if (response.ok) {
        const review = await response.json();
        dispatch(loadReviews(review));
        return review
    }
}

export const getReviewById = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    console.log('REVIEWS ACTION HIT', response)
    if (response.ok) {
        const review = await response.json();
        dispatch(loadReviews(review));
        return review
    }
}
// export const deleteReview = id => async dispatch => {
//     const response = await csrfFetch(`/api/reviews/${id}`);
//     if (response.ok) {
//         const review = await response.json();
//         dispatch(delReview(id));
//         return review
//     }
// };

// export const addingReview = (review, id) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}/reviews`, {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(review)
//     })
//     if (response.ok) {
//         const review = await response.json();
//         dispatch(addReview(review));
//         return review
//     }
// }
const reviewsReducer = (state = { review: {}, allReviews: {} }, action) => {
    console.log('REVIEWS REDUCER HIT', action)
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = { review: {}, allReviews: {} };
            console.log('REVIEWS THUNK HIT', newState)
            action.review.Reviews.forEach(e => {
                newState.allReviews[e.id] = e
            })
            return newState
        }
        case ADD_REVIEW: {
            const newState = { ...state, review: { ...state.review }, allReviews: { ...state.allReviews } };
            newState.review = action.review;
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state, review: { ...state.review }, allReviews: { ...state.allReviews } };
            delete newState.allReviews[action.review.id];
            return newState
        }

        default: return state
    }
}

export default reviewsReducer
