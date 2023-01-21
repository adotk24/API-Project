import { csrfFetch } from './csrf';
const GET_MY_BOOKINGS = '/bookings/GET_MY_BOOKINGS';



const loadMyBookings = bookings => {
    return {
        type: GET_MY_BOOKINGS, bookings
    }
}

export const getMyBookings = () => async dispatch => {
    console.log('THUNKER')
    const response = await fetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json()
        console.log('THUNKER', bookings)
        dispatch(loadMyBookings(bookings))
        return bookings
    }
}

const bookingsReducer = (state = { oneBooking: {}, allBookings: {} }, action) => {
    switch (action.type) {
        case GET_MY_BOOKINGS: {
            const newState = { oneBooking: {}, allBookings: {} }
            console.log('REDUCER', action)
            action.bookings.Bookings.forEach(e => {
                newState.allBookings[e.id] = e
            })
            return newState
        }
        default: return state
    }
}

export default bookingsReducer
