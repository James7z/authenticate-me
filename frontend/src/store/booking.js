import { csrfFetch } from '../store/csrf'

const LOAD_USER_BOOKINGS = 'Booking/LOAD_USER_BOOKINGS';
const LOAD_USER_BOOKING = 'Booking/LOAD_USER_BOOKING';
const REMOVE_USER_BOOKING = 'Booking/REMOVE_USER_BOOKING';
const loadUserBookings = bookingList => ({
    type: LOAD_USER_BOOKINGS,
    bookingList
});


const loadUserBooking = booking => ({
    type: LOAD_USER_BOOKING,
    booking
});

const removeUserBooking = bookingId => ({
    type: REMOVE_USER_BOOKING,
    bookingId
})


export const getUserBookings = () => async dispatch => {
    const response = await fetch(`/api/bookings/current`);

    if (response.ok) {
        const bookingList = await response.json();
        // console.log("*******Get User Booking List are:")
        // console.log(bookingList)
        dispatch(loadUserBookings(bookingList));
    }
};

export const updateABooking = (payload, bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const booking = await response.json();
        dispatch(loadUserBooking(booking));
    }
};

export const deleteUserBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeUserBooking(bookingId));
    }
};

const initialState = {};

export default function bookingReducer(state = initialState, action) {
    let curr_user_bookings = {};
    let newState = {};
    switch (action.type) {
        case LOAD_USER_BOOKINGS:
            action.bookingList.Bookings.forEach(booking => curr_user_bookings[booking.id] = booking);
            return {
                ...curr_user_bookings
            }
        case LOAD_USER_BOOKING:
            return {
                ...state, [action.booking.id]: { ...state[action.booking.id], ...action.booking }
            }
        case REMOVE_USER_BOOKING:
            newState = { ...state };
            delete newState[action.bookingId];
            return newState;
        default:
            return state;
    }
}
