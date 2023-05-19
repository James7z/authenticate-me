import React from "react";
import { useModal } from "../../context/Modal";
import './BookingForm.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteABooking, getSpotDetails } from "../../store/spot";
import { deleteUserBooking, getUserBookings } from "../../store/booking";

export default function DeleteBookingForm({ bookingId, formType }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    const currUserId = currUser.id
    const handleDelete = () => {
        //console.log(spotId)
        // if (formType === "Spot Booking") {
        //     dispatch(deleteAReview(reviewId, spotId)).then(closeModal);
        // }
        // if (formType === "User Booking") {
        //     dispatch(deleteUserReview(reviewId)).then(closeModal);
        // }
        dispatch(deleteUserBooking(bookingId)).then(closeModal)

    }
    const handleKeep = () => {
        //console.log(spotId)
        if (currUser) dispatch(getUserBookings(currUser.id)).then(closeModal);

    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to delete this review? </h4>
            <div className="delete-form-buttons-container">
                <button onClick={handleDelete} className="red-button">{"Yes (Delete Booking)"}</button>
                <button onClick={handleKeep} className="grey-button">{"No (Keep Booking)"}</button>
            </div>
        </>
    )

}
