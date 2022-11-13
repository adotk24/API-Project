import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_ONE_SPOT = 'spot/LOAD_ONE_SPOT';
const ADD_SPOT = 'spot/ADD_SPOT';
const UPDATE_SPOT = 'spot/UPDATE_SPOT';
const DELETE_SPOT = '/spot/DELETE_SPOT';

const loadSpots = spots => ({ type: LOAD_SPOTS, spots });

const loadOneSpot = spot => ({ type: LOAD_ONE_SPOT, spot });

const addSpot = spot => ({ type: ADD_SPOT, spot });

const updateSpot = spot => ({ type: UPDATE_SPOT, spot });

const deleteSpot = spot => ({ type: DELETE_SPOT, spot });

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const allSpots = await response.json();
        dispatch(loadSpots(getAllSpots));
        return allSpots
    }
};

export const getOneSpot = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(loadOneSpot(spot));
        return spot
    }
};

export const addingSpot = spot => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(spot)
    });
    if (response.ok) {
        const addedSpot = await response.json();
        dispatch(addSpot(addedSpot));
        return addedSpot
    }
};

export const editSpot = (id, spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(spot)
    });
    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(updateSpot(editedSpot));
        return editSpot
    }
};

export const deletingSpot = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
    if (response.ok) {
        const deletedSpot = await response.json();
        dispatch(deleteSpot(id));
        return deletedSpot
    }
}

export const normalize = arr => {
    let ans = {};
    arr.forEach(e => { ans[e.id] = e });
    return ans
}

const initialState = { spot: {}, allSpots: {} }

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS: newState = { ...state, allSpots: normalize[{ ...state.allSpots }] };
            return newState
        case LOAD_ONE_SPOT: newState = { ...state, spot: { ...state.spot } };
            return newState
        case ADD_SPOT: newState = { ...state, allSpots: normalize[{ ...state.allSpots }] };
            return newState
        case UPDATE_SPOT: newState = { ...state, allSpots: normalize[{ ...state.allSpots }] };
            return newState
        case DELETE_SPOT: newState = { ...state, allSpots: normalize[{ ...state.allSpots }] };
            delete newState.allSpots[action.spotId];
            return newState
        default: return newState
    }
}

export default spotsReducer
