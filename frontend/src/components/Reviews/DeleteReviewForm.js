import React from "react";
import { useModal } from "../../context/Modal";
import './ReviewForm.css'
import { useDispatch } from "react-redux";
import { deleteAReview, getSpotDetails } from "../../store/spot";
import { deleteUserReview } from "../../store/review";

export default function DeleteReviewForm({ reviewId, spotId, formType }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const handleDelete = () => {
        //console.log(spotId)
        if (formType === "Spot Review") {
            dispatch(deleteAReview(reviewId, spotId)).then(closeModal);
        }
        if (formType === "User Review") {
            dispatch(deleteUserReview(reviewId)).then(closeModal);
        }

    }
    const handleKeep = () => {
        //console.log(spotId)
        dispatch(getSpotDetails(spotId)).then(closeModal);

    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to delete this review? </h4>
            <div className="delete-form-buttons-container">
                <button onClick={handleDelete} className="red-button">{"Yes (Delete Review)"}</button>
                <button onClick={handleKeep} className="grey-button">{"No (Keep Review)"}</button>
            </div>
        </>
    )

}
