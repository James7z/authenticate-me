import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails, getSpotReviews } from "../../store/spot";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import './SpotForm.css'
import SpotReviews from "./SpotReviews";
import ReviewForm from "../Reviews/ReviewForm";

export default function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => {
        if (state.spots.singleSpot) return state.spots.singleSpot
    })
    let reviewList = [];
    reviewList = useSelector(state => {
        if (state.spots.reviews) return Object.values(state.spots.reviews).sort((a, b) => b.id - a.id)
        else return []
    })
    // console.log("***Spot Details reviewList is ")
    // console.log(reviewList)
    const currUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])

    if (!spot) {
        return (
            <>
                <h1>Unable to retrieve spots. Please try again shortly. </h1>
            </>
        )
    }

    const isLoggedIn = currUser !== null
    let notOwner;
    if (spot && currUser) {
        notOwner = currUser.id !== spot.ownerId;
    }
    const previewImage = spot.SpotImages.find(image => image.preview === true);
    const previewImageUrl = previewImage ? previewImage.url : '';
    const spotImages = spot.SpotImages.filter(image => image.preview === false).slice(0, 4)

    const avgStars = typeof spot.avgStarRating === "number" ? Math.round(spot.avgStarRating * 10) / 10 : "New";
    let reviewMsg = '';
    let reviewCnt = spot.numReviews;
    if (reviewCnt === 1) reviewMsg = ` · 1 Review`;
    if (reviewCnt > 1) reviewMsg = ` · ${reviewCnt} Reviews`;
    let reviewMsg2 = '';
    if (isLoggedIn && notOwner && reviewCnt === 0) reviewMsg2 = "Be the first to post a review!";
    let showPostReview = false;
    if (isLoggedIn && notOwner && reviewList && !reviewList.find(review => review.userId === currUser.id)) showPostReview = true;
    return (
        <div className="spot-detail-container">

            <h2>{spot.name}</h2>
            <div>{spot.city + ', ' + spot.state + ', ' + spot.country}</div>
            <div className="spot-detail-images-container">
                <div className="spot-detail-preview-image-container" >
                    <img className="spot-detail-preview-image" src={previewImageUrl}
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
                        <button onClick={e => window.alert("Feature Comming Soon")}>Register</button>
                    </div>
                </div>
            </div>
            <div className="spot-details-reviews-container">
                <h2>★ {avgStars + reviewMsg}</h2>
                <div className={showPostReview ? "normal" : "hidden"}>
                    <span>       <OpenModalButton
                        buttonText="Post your review"
                        modalComponent={<ReviewForm spotId={spot.id} reviewObj={{ review: '', stars: 1 }} formType="Create a Review" />}
                    />

                    </span>
                </div>

                <div>
                    <SpotReviews reviewList={reviewList} reviewMsg={reviewMsg2} currUserId={currUser ? currUser.id : undefined} ></SpotReviews>
                </div>

            </div>
        </div>
    )
}
