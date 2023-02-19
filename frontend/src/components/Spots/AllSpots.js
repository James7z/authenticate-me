import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from "../../store/spot";
import { NavLink } from "react-router-dom";
import './SpotForm.css'

export default function AllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => {
        if (state.spots.allSpots) return Object.values(state.spots.allSpots)
    })

    //     console.log(spots)

    useEffect(() => {
        dispatch(getSpot())
    }, [dispatch])

    if (!spots) {
        return (
            <>
                <h1>Unable to retrieve spots. Please try again shortly. </h1>
            </>
        )
    }

    return (
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
                                        {/* <span>{spot.city + ", " + spot.state}</span> */}
                                        <span>{spot.name}</span>
                                        <span>★ {typeof spot.avgStarRating === "number" ? Math.round(spot.avgStarRating * 10) / 10 : "New"}</span>
                                    </div>
                                    <div className="secondary-text">
                                        {"$" + spot.price + " night"}
                                    </div>
                                </div>

                            </NavLink>
                        </div>

                    );
                })}
            </nav>
        </div>
    )
}
