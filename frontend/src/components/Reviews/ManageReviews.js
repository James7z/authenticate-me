import SpotReviews from "../Spots/SpotReviews"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserReviews } from "../../store/review";
import DeleteReviewForm from "./DeleteReviewForm";
import OpenModalButton from "../OpenModalButton";
import ReviewForm from "./ReviewForm";

export default function ManageReviews() {

    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    const currUserId = currUser.id
    let reviewMsg = "There is no review posted yet.";
    let reviewList = [];
    reviewList = useSelector(state => {
        if (state.reviews) return Object.values(state.reviews).sort((a, b) => b.id - a.id)
        else return []
    })

    useEffect(() => {
        if (currUser) dispatch(getUserReviews(currUser.id));
    }, [dispatch])

    if (!reviewList) return (null)
    //if (reviewList.length === 0) return (<div> {reviewMsg}</div>)
    const options = { year: 'numeric', month: 'long' };

    return (<>
        <h2>Manage Reviews</h2>
        {
            reviewList.map(review => (
                <div key={review.id} className='spot-details-review-card'>
                    <div>{review.Spot.name}</div>
                    <div>{(new Date(review.createdAt)).toLocaleDateString(undefined, options)}</div>
                    <div>{review.review}</div>

                    <div className={review.userId === currUserId ? "normal" : "hidden"}>
                        <span>       <OpenModalButton
                            buttonText="Update"
                            modalComponent={<ReviewForm spotId={review.spotId} reviewObj={review} formType="Update a Review" />}
                        />

                        </span>
                        <span>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewForm spotId={review.spotId} reviewId={review.id} formType="User Review" />}

                            />
                        </span>
                    </div>
                </div>
            ))
        }

    </>
    )


}
