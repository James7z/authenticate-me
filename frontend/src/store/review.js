import { csrfFetch } from '../store/csrf'

const LOAD_USER_REVIEWS = 'review/LOAD_USER_REVIEWS';
const LOAD_USER_REVIEW = 'review/LOAD_USER_REVIEW';
const REMOVE_USER_REVIEW = 'review/REMOVE_USER_REVIEW';
const loadUserReviews = reviewList => ({
    type: LOAD_USER_REVIEWS,
    reviewList
});


const loadUserReview = review => ({
    type: LOAD_USER_REVIEW,
    review
});

const removeUserReview = reviewId => ({
    type: REMOVE_USER_REVIEW,
    reviewId
})


export const getUserReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews/current`);

    if (response.ok) {
        const reviewList = await response.json();
        // console.log("*******Get User Review List are:")
        // console.log(reviewList)
        dispatch(loadUserReviews(reviewList));
    }
};

export const updateAReview = (payload, reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(loadUserReview(review));
    }
};

export const deleteUserReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeUserReview(reviewId));
    }
};

const initialState = {};

export default function reviewReducer(state = initialState, action) {
    let curr_user_reviews = {};
    let newState = {};
    switch (action.type) {
        case LOAD_USER_REVIEWS:
            action.reviewList.Reviews.forEach(review => curr_user_reviews[review.id] = review);
            return {
                ...curr_user_reviews
            }
        case LOAD_USER_REVIEW:
            return {
                ...state, [action.review.id]: { ...state[action.review.id], ...action.review }
            }
        case REMOVE_USER_REVIEW:
            newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}
