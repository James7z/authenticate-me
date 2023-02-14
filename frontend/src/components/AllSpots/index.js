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
        return null;
    }

    return (
        <main>
            <div>
                <nav className="spotNav">
                    {spots.map((spot) => {
                        return (
                            <NavLink key={spot.name} to={`/spot/${spot.id}`}>
                                <div>
                                    <div className="spotImageCotainer">
                                        <img className="spotImage"
                                            src={spot.previewImage}
                                            alt={"Image of " + spot.name}></img>
                                    </div>
                                    <div>
                                        <div className="primary-text">
                                            <span>{spot.city + ", " + spot.state}</span>
                                            <span>★ {Math.round(spot.avgStarRating * 100) / 100}</span>
                                        </div>
                                        <div className="secondary-text">
                                            {"$" + spot.price + " night"}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })}
                </nav>

            </div>
        </main>
    )
}
