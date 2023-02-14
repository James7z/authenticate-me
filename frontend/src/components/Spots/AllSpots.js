import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from "../../store/spot";
import { NavLink, useParams } from "react-router-dom";
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
        return null;
    }

    return (
        <div className="test">
            <nav className="spot-nav">
                {spots.map((spot) => {
                    return (
                        <div className="nav-spot-card">
                            <NavLink key={spot.name} to={`/spot/${spot.id}`} >

                                <div className="spot-image-container">
                                    <img className="spot-image"
                                        src={spot.previewImage}
                                        alt={"Image of " + spot.name}></img>
                                </div>
                                <div className="spot-text-container">
                                    <div className="primary-text">
                                        <span>{spot.city + ", " + spot.state}</span>
                                        <span>★ {Math.round(spot.avgStarRating * 10) / 10}</span>
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




export function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    console.log("spot id is " + spotId);
    const spots = useSelector(state => {
        if (state.spots.allSpots) return Object.values(state.spots.allSpots)
    })

    //     console.log(spots)

    useEffect(() => {
        dispatch(getSpot())
    }, [dispatch])

    if (!spots) {
        return null;
    }

    return (
        <div className="test">
            <nav className="spot-nav">
                {spots.map((spot) => {
                    return (
                        <div className="nav-spot-card">
                            <NavLink key={spot.name} to={`/spot/${spot.id}`} >

                                <div className="spot-image-container">
                                    <img className="spot-image"
                                        src={spot.previewImage}
                                        alt={"Image of " + spot.name}></img>
                                </div>
                                <div className="spot-text-container">
                                    <div className="primary-text">
                                        <span>{spot.city + ", " + spot.state}</span>
                                        <span>★ {Math.round(spot.avgStarRating * 10) / 10}</span>
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
