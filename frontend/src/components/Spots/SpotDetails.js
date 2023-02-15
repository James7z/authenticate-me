import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails, getSpotReviews } from "../../store/spot";
import { useParams } from "react-router-dom";
import './SpotForm.css'

export default function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const options = { year: 'numeric', month: 'long' };

    //console.log("spot id is " + spotId);
    const spot = useSelector(state => {
        if (state.spots.singleSpot) return state.spots.singleSpot
    })
    //console.log(spot)
    const reviewList = useSelector(state => {
        if (state.spots.reviews) return Object.values(state.spots.reviews).sort((a, b) => b.id - a.id)
    })
    //console.log(reviewList)
    const currUser = useSelector(state => state.session.user);
    //console.log(currUser)
    const isLoggedIn = currUser !== null
    //console.log("user logged in " + isLoggedIn)
    let notOwner;
    if (spot && currUser) {
        notOwner = currUser.id !== spot.ownerId;
    }
    //console.log("Not owner? " + notOwner)

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])

    if (!spot) {
        return null;
    }
    const previewImage = spot.SpotImages.find(image => image.preview === true);
    const spotImages = spot.SpotImages.filter(image => image.preview === false).slice(0, 4)
    //console.log(spotImages)
    const avgStars = typeof spot.avgStarRating === "number" ? Math.round(spot.avgStarRating * 10) / 10 : "New";
    let reviewMsg = '';
    if (spot.numReviews === 1) reviewMsg = ` · 1 Review`;
    if (spot.numReviews > 1) reviewMsg = ` · ${spot.numReviews} Reviews`;
    let reviewMsg2 = '';
    if (isLoggedIn && notOwner && spot.numReviews === 0) reviewMsg2 = "Be the first to post a review!";


    return (
        <div className="spot-detail-container">

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
                        // <div >
                        <img className="spot-detail-image" src={image.url} alt={"Image of " + spot.name + " " + i + 1} key={i} />
                        //</div>
                    ))}
                </div>

            </div>
            <div className="spot-details-info-container">
                <div className="spot-details-info-description">
                    <h2>Hosted by {spot.Owner.firstName + " " + spot.Owner.lastName}</h2>
                    <div>
                        {spot.description}
                    </div>
                </div>
                <div className="spot-details-info-price-starts">
                    <div className="spot-price-stars">
                        <span >
                            {"$" + spot.price + " night"}
                        </span>
                        <span>★ {avgStars + reviewMsg}
                        </span>
                    </div>
                    <div className="spot-reserve-button-container">
                        <button onClick={e => window.alert("Feature Comming Soon")}>Reserve</button>
                    </div>
                </div>
            </div>

            <div className="spot-details-reviews-container">
                <h2>Reviews</h2>
                <div>{spot.numReviews === 0 ?
                    (reviewMsg2) :
                    (
                        reviewList.map(review => (
                            <div key={review.id} className='spot-details-review-card'>
                                <div>{review.User.firstName}</div>
                                <div>{(new Date(review.createdAt)).toLocaleDateString(undefined, options)}</div>
                                <div>{review.review}</div>
                            </div>
                        ))
                    )}</div>

            </div>
        </div>


    )
}