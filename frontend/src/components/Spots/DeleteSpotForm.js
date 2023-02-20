import React from "react";

import { useModal } from "../../context/Modal";
import './SpotForm.css'
import { useDispatch } from "react-redux";
import { deleteASpot, getSpotDetails } from "../../store/spot";

export default function DeleteSpotForm({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteASpot(spotId)).then(closeModal);

    }
    const handleKeep = () => {
        dispatch(getSpotDetails(spotId)).then(closeModal);

    }

    return (
        <>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot? </h4>
            <div className="delete-form-buttons-container">
                <button onClick={handleDelete} className="red-button">{"Yes (Delete Spot)"}</button>
                <button onClick={handleKeep} className="grey-button">{"No (Keep Spot)"}</button>
            </div>
        </>
    )

}
