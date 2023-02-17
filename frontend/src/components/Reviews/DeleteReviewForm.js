import React from "react";

import { useModal } from "../../context/Modal";
import './SpotForm.css'
import { useDispatch } from "react-redux";
import { deleteAReview, getSpotDetails } from "../../store/spot";

export default function DeleteSpotForm({ spotId }) {
    //if (!open) return null;
    console.log(spotId)
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const handleDelete = () => {
        //console.log(spotId)
        dispatch(deleteAReview(spotId)).then(closeModal);

    }
    const handleKeep = () => {
        //console.log(spotId)
        dispatch(getSpotDetails(spotId)).then(closeModal);

    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to delete this review? </h2>
            <div>
                <button onClick={handleDelete} className="red-button">{"Yes (Delete Review)"}</button>
                <button onClick={handleKeep} className="grey-button">{"No (Keep Review)"}</button>
            </div>
        </>
    )

}
