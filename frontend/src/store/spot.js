import { csrfFetch } from '../store/csrf'

const LOAD_SPOTS = 'spot/LOAD';
const LOAD_SPOT_DETAILS = 'spot/LOAD_DETAILS ';
const LOAD_SPOT_REVIEWS = 'spot/LOAD_SPOT_REVIEWS';
const ADD_A_SPOT = 'spot/ADD_A_SPOT ';
const ADD_A_SPOT_IMAGE = 'spot/ADD_A_SPOT_IMAGE';
const REMOVE_A_SPOT = 'spot/DELET_A_SPOT';
const ADD_A_SPOT_REVIEW = 'spot/LOAD_A_REVIEW';
const REMOVE_SPOT_REVIEW = 'spot/REMOVE_REVIEW';


const loadSpots = spotList => ({
    type: LOAD_SPOTS,
    spotList
});

const loadSpotDetails = spotDetails => ({
    type: LOAD_SPOT_DETAILS,
    spotDetails
});

const loadSpotReviews = reviewList => ({
    type: LOAD_SPOT_REVIEWS,
    reviewList
});

const addASpot = spot => ({
    type: ADD_A_SPOT,
    spot
});

// const addASpotReview = review => ({
//     type: ADD_A_SPOT_REVIEW,
//     review
// });




const addASpotImage = spotImage => ({
    type: ADD_A_SPOT_IMAGE,
    spotImage
});

const removeSpot = spotId => ({
    type: REMOVE_A_SPOT,
    spotId
})

const removeSpotReview = reviewId => ({
    type: REMOVE_SPOT_REVIEW,
    reviewId
})

export const getSpot = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spotList = await response.json();
        dispatch(loadSpots(spotList));
    }
};

export const getUsersSpot = (userId) => async dispatch => {
    const response = await fetch(`/api/spots/current`);

    if (response.ok) {
        const spotList = await response.json();
        dispatch(loadSpots(spotList));
    }
};

export const getSpotDetails = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spotDetails = await response.json();
        dispatch(loadSpotDetails(spotDetails));
    }
};

export const getSpotReviews = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviewList = await response.json();
        dispatch(loadSpotReviews(reviewList));
    }
};

export const createASpot = (spotObj) => async dispatch => {
    const response = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotObj)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(addASpot(newSpot));
        return newSpot;
    }
};

export const createASpotImage = ({ imageObj, spotId }) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageObj)
    });

    if (response.ok) {
        const newSpotImage = await response.json();
        dispatch(addASpotImage(newSpotImage));
        return newSpotImage;
    }
};

export const updateASpot = ({ payload, spotId }) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(addASpot(newSpot));
        return newSpot;
    }
};

export const deleteASpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeSpot(spotId));
    }
};


export const createASpotReview = (reviewObj, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewObj)
    });

    if (response.ok) {
        dispatch(getSpotDetails(spotId))
        dispatch(getSpotReviews(spotId))

    }
};


export const updateASpotReview = (payload, reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        dispatch(getSpotDetails(spotId))
        dispatch(getSpotReviews(spotId))

    }
};

export const deleteAReview = (reviewId, spotId) => async dispatch => {
    // console.log("***spotId is ", spotId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeSpotReview(reviewId));
        dispatch(getSpotDetails(spotId))
    }
};

const initialState = {};

const sortList = (list) => {
    return list.sort((spotA, spotB) => {
        return spotA.number - spotB.number;
    }).map((spot) => spot.id);
};

export default function spotReducer(state = initialState, action) {
    let allSpots = {};
    //let newState = {};
    let reviews = {};
    switch (action.type) {
        case LOAD_SPOTS:

            action.spotList.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            return {
                ...state,
                allSpots: { ...allSpots },
                orderedSpotList: sortList(action.spotList.Spots)
            };
        case LOAD_SPOT_DETAILS:
            const singleSpot = { ...action.spotDetails };
            return {
                ...state,
                singleSpot
            }
        case LOAD_SPOT_REVIEWS:
            action.reviewList.Reviews.forEach(review => reviews[review.id] = review);
            return {
                ...state,
                reviews
            }
        case REMOVE_A_SPOT:
            allSpots = { ...state.allSpots };
            delete allSpots[action.spotId]
            return { ...state, allSpots }
        case ADD_A_SPOT:
            return state;
        case ADD_A_SPOT_IMAGE:
            return state;
        case ADD_A_SPOT_REVIEW:
            reviews = { ...state.reviews, [action.review.id]: action.review }
            return { ...state, reviews }
        case REMOVE_SPOT_REVIEW:
            reviews = { ...state.reviews }
            delete reviews[action.reviewId]
            return { ...state, reviews }
        default:
            return state;
    }
}
