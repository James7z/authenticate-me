import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersSpot } from "../../store/spot";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import './SpotForm.css'
import DeleteSpotForm from "./DeleteSpotForm";


export default function ManageSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => {
        if (state.spots.allSpots) return Object.values(state.spots.allSpots)
    });


    useEffect(() => {
        dispatch(getUsersSpot())
    }, [dispatch])

    if (!spots) {
        return null;
    }


    return (
        <>
            <h2>Manage Spots</h2>
            <NavLink to="/spots/new" className={"create-spot"}>Create a New Spot</NavLink>
            <div className="spot-nav-container">
                <nav className="spot-nav">
                    {spots.map((spot) => {
                        return (
                            <div className="nav-spot-card" key={spot.id} >
                                <NavLink to={`/spots/${spot.id}`} >

                                    <div className="spot-image-container">
                                        <img className="spot-image"
                                            src={spot.previewImage}
                                            alt={"Image of " + spot.name}></img>
                                    </div>
                                    <div className="spot-text-container">
                                        <div className="primary-text">
                                            <span>{spot.city + ", " + spot.state}</span>
                                            <span>★ {typeof spot.avgStarRating === "number" ? Math.round(spot.avgStarRating * 10) / 10 : "New"}</span>
                                        </div>
                                        <div className="secondary-text">
                                            {"$" + spot.price + " night"}
                                        </div>
                                    </div>

                                </NavLink>
                                <div>
                                    <NavLink to={`/spots/${spot.id}/edit`} ><button>Update</button>  </NavLink>
                                    <span>       <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteSpotForm spotId={spot.id} />}
                                    // onButtonClick={() => console.log("Greeting initiated")}
                                    // onModalClose={() => console.log("Greeting completed")}
                                    />

                                    </span>


                                </div>
                            </div>

                        );
                    })}
                </nav>
            </div>
        </>
    )
}
