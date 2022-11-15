import { csrfFetch } from "./csrf";
const GET_SPOTS = 'spots/GET_SPOTS';
const GET_ONE_SPOT = 'spot/GET_ONE_SPOT';
const ADD_SPOT = 'spot/ADD_SPOT';
const UPDATE_SPOT = 'spot/UPDATE_SPOT';
// const DELETE_SPOT = '/spot/DELETE_SPOT';



const loadSpots = (spots) => {
    return {
        type: GET_SPOTS, spots
    }
};

const loadOneSpot = spot => {
    return {
        type: GET_ONE_SPOT, spot
    }
}

const addSpot = spot => ({ type: ADD_SPOT, spot });

const updateSpot = spot => {
    return {
        type: UPDATE_SPOT, spot
    }
};

// const deleteSpot = spot => ({ type: DELETE_SPOT, spot });



export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }

};

export const getOneSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(loadOneSpot(spot));
        return spot

    }

};

export const getMySpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
        return spots
    }
}

export const addingSpot = addedSpot => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(addedSpot)
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot));
        return spot
    }
};

export const editSpot = (spot, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(spot)
    });
    if (response.ok) {
        const spot = await response.json();
        console.log('EDIT SPOT THUNK', spot)
        dispatch(updateSpot(spot));
        return spot
    }
};

// export const deletingSpot = id => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
//     if (response.ok) {
//         const deletedSpot = await response.json();
//         dispatch(deleteSpot(id));
//         return deletedSpot
//     }
// }



// const initialState = { spot: {}, allSpots: {} }

const spotsReducer = (state = { spot: {}, allSpots: {} }, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOTS:
            action.spots.Spots.forEach(e => {
                newState.allSpots[e.id] = e
            })
            return newState;
        case GET_ONE_SPOT:
            newState.spot = action.spot;
            return newState
        case ADD_SPOT:
            newState.spot = action.spot
            console.log('ADD SPOT REDUCER HIT THIS IS THE NEWSTATE', newState)
            return newState
        case UPDATE_SPOT:
            newState.allSpots[action.spot.id] = action.spot
            newState.spot = action.spot
            return newState
        // case DELETE_SPOT: newState = { ...state, allSpots: normalize[{ ...state.allSpots }] };
        //     delete newState.allSpots[action.spotId];
        //     return newState
        default: return state
    }
}

export default spotsReducer
