import { csrfFetch } from './csrf';
const GET_MY_BOOKINGS = '/bookings/GET_MY_BOOKINGS';
const ADD_BOOKING = '/bookings/ADD_BOOKING'
const EDIT_BOOKING = '/bookings/EDIT_BOOKING'
const DELETE_BOOKING = '/bookings/DELETE_BOOKING'
const loadMyBookings = bookings => {
    return {
        type: GET_MY_BOOKINGS, bookings
    }
}

const addBooking = booking => {
    return {
        type: ADD_BOOKING, booking
    }
}
const editBooking = booking => {
    return {
        type: EDIT_BOOKING, booking
    }
}

const deleteBooking = booking => {
    return {
        type: DELETE_BOOKING, booking
    }
}

export const getMyBookings = () => async dispatch => {
    const response = await fetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json()
        dispatch(loadMyBookings(bookings))
        return bookings
    }
}
export const getBookingsBySpot = spotId => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/bookings`)

    if (response.ok) {
        const bookings = await response.json()
        dispatch(loadMyBookings(bookings))
        return bookings
    }
}

export const addingBooking = (spotId, booking) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(booking)
    })
    if (response.ok) {
        const booking = await response.json()
        dispatch(addBooking(booking))
        return booking
    }


}

export const edittingBooking = (bookingId, booking) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}/edit`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(booking)
    })
    if (response.ok) {
        const booking = await response.json()
        dispatch(editBooking(booking))
        return booking
    }
}

export const deletingBooking = bookingId => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}/delete`, { method: 'DELETE' })
    if (response.ok) {
        const booking = await response.json()
        await dispatch(deleteBooking(booking))
        return booking
    }
}


const bookingsReducer = (state = { oneBooking: {}, allBookings: {} }, action) => {
    switch (action.type) {
        case GET_MY_BOOKINGS: {
            const newState = { ...state, oneBooking: { ...state.oneBooking }, allBookings: { ...state.allBookings } }

            action.bookings.Bookings.forEach(e => {
                newState.allBookings[e.id] = e
            })
            return newState
        }
        case ADD_BOOKING: {
            const newState = { ...state, oneBooking: { ...state.oneBooking }, allBookings: { ...state.allBookings } }
            newState.oneBooking = action.booking
            return newState
        }
        case EDIT_BOOKING: {
            const newState = { ...state, oneBooking: { ...state.oneBooking }, allBookings: { ...state.allBookings } }
            newState.allBookings[action.booking.id] = action.booking
            newState.oneBooking = action.booking
            return newState
        }
        case DELETE_BOOKING: {
            const newState = { ...state, oneBooking: { ...state.oneBooking }, allBookings: { ...state.allBookings } }
            delete newState.allBookings[action.booking.id]
            return newState
        }
        default: return state
    }
}

export default bookingsReducer
