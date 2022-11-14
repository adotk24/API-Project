import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GET_SPOTS';
// const GET_ONE_SPOT = 'spot/GET_ONE_SPOT';
// const ADD_SPOT = 'spot/ADD_SPOT';
// const UPDATE_SPOT = 'spot/UPDATE_SPOT';
// const DELETE_SPOT = '/spot/DELETE_SPOT';

const loadSpots = (spots) => {
    return {
        type: GET_SPOTS, spots
    }
};

// const loadOneSpot = spot => ({ type: GET_ONE_SPOT, spot });

// const addSpot = spot => ({ type: ADD_SPOT, spot });

// const updateSpot = spot => ({ type: UPDATE_SPOT, spot });

// const deleteSpot = spot => ({ type: DELETE_SPOT, spot });

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }

};

// export const getOneSpot = id => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}`);
//     if (response.ok) {
//         const spot = await response.json();
//         dispatch(loadOneSpot(spot));
//         return spot
//     }
// };

// export const addingSpot = spot => async dispatch => {
//     const response = await csrfFetch('/api/spots', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(spot)
//     });
//     if (response.ok) {
//         const addedSpot = await response.json();
//         dispatch(addSpot(addedSpot));
//         return addedSpot
//     }
// };

// export const editSpot = (id, spot) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}`, {
//         method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(spot)
//     });
//     if (response.ok) {
//         const editedSpot = await response.json();
//         dispatch(updateSpot(editedSpot));
//         return editSpot
//     }
// };

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
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState;
        // case GET_ONE_SPOT: newState = { ...state, spot: { ...state.spot } };
        //     return newState
        // case ADD_SPOT: newState = { ...state, allSpots: normalize[{ ...state.allSpots }] };
        //     return newState
        // case UPDATE_SPOT: newState = { ...state, allSpots: normalize[{ ...state.allSpots }] };
        //     return newState
        // case DELETE_SPOT: newState = { ...state, allSpots: normalize[{ ...state.allSpots }] };
        //     delete newState.allSpots[action.spotId];
        //     return newState
        default: return state
    }
}

export default spotsReducer
