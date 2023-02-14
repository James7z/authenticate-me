import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot, getSpotDetails } from "../../store/spot";
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
        <div className="spot-nav-container">
            <nav className="spot-nav">
                {spots.map((spot) => {
                    return (
                        <div className="nav-spot-card" key={spot.name} >
                            <NavLink to={`/spots/${spot.id}`} >

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
    //console.log("spot id is " + spotId);
    const spot = useSelector(state => {
        if (state.spots.singleSpot) return state.spots.singleSpot
    })

    //console.log(spot)

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    if (!spot) {
        return null;
    }
    const previewImage = spot.SpotImages.find(image => image.preview === true);
    const spotImages = spot.SpotImages.filter(image => image.preview === false).slice(0, 4)
    console.log(spotImages)
    return (
        <div className="spot-detail">
            <h2>{spot.name}</h2>
            <div>{spot.city + ', ' + spot.state + ', ' + spot.country}</div>
            <div className="spot-detail-images-container">
                <div className="spot-detail-preview-image-container" >
                    <img className="spot-detail-preview-image" src={previewImage.url}
                        alt={"Preview image of " + spot.name}>
                    </img>
                </div>
                <div className="spot-detail-image-container-2" >
                    {spotImages.map((image, i) => (
                        // <div key={i}>
                        <img className="spot-detail-image" src={image.url} alt={"Image of " + spot.name + " " + i + 1} />
                        //</div>
                    ))}
                </div>

            </div>
            <div className="spot-details-info-container">
                <div>
                    <h2>Hosted by {spot.Owner.firstName + " " + spot.Owner.lastName}</h2>
                    <div>
                        {spot.description}
                    </div>
                </div>
                <div>
                    <div className="spot-price-stars">
                        <span >
                            {"$" + spot.price + " night"}
                        </span>
                        <span>★ {Math.round(spot.avgStarRating * 10) / 10}</span>
                    </div>
                    <div className="spot-reserve-button-container">
                        <button onClick={e => window.alert("Feature Comming Soon")}>Reserve</button>
                    </div>
                </div>
            </div>


        </div>


    )
}
