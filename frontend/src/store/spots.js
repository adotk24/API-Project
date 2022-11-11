import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_ONE_SPOT = 'spot/LOAD_ONE_SPOT';
const LOAD_USER_SPOTS = 'spot/LOAD_USER_SPOTS';
const ADD_SPOT = 'spot/ADD_SPOT';
const UPDATE_SPOT = 'spot/UPDATE_SPOT';
const DELETE_SPOT = '/spot/DELETE_SPOT';

const loadSpots = spots => {
    type: LOAD_SPOTS, spots
};

const loadOneSpot = spot => {
    type: LOAD_ONE_SPOT, spot
};

const loadUserSpots = spots => {
    type: LOAD_USER_SPOTS, spots
};

const addSpot = spot => {
    type: ADD_SPOT, spot
};

const updateSpot = spot => {
    type: UPDATE_SPOT, spot
};

const deleteSpot = spot => {
    type: DELETE_SPOT, spot
}
