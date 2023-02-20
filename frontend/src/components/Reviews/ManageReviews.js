
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserReviews } from "../../store/review";
import DeleteReviewForm from "./DeleteReviewForm";
import OpenModalButton from "../OpenModalButton";
import ReviewForm from "./ReviewForm";
import './ReviewForm.css';

export default function ManageReviews() {

    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    const currUserId = currUser.id
    let reviewMsg = "Please visit a spot to post a review.";
    let reviewList = [];
    reviewList = useSelector(state => {
        if (state.reviews) return Object.values(state.reviews).sort((a, b) => b.id - a.id)
        else return []
    })

    useEffect(() => {
        if (currUser) dispatch(getUserReviews(currUser.id));
    }, [dispatch, currUser])

    if (reviewList.length === 0) return (
        <>
            <div className="manage-review-container">
                <h2>My Reviews</h2>
                <h3>{reviewMsg}</h3>
            </div>
        </>
    )

    const options = { year: 'numeric', month: 'long' };

    return (<>
        <div className="manage-review-container">
            <h2>My Reviews</h2>
            {
                reviewList.map(review => (
                    <div key={review.id} className='spot-details-review-card'>
                        <div>{review.Spot.name}</div>
                        <div>{(new Date(review.createdAt)).toLocaleDateString(undefined, options)}</div>
                        <div>{review.review}</div>

                        <div className={review.userId === currUserId ? "normal" : "hidden"}>
                            <span>       <OpenModalButton
                                buttonText="Update"
                                modalComponent={<ReviewForm spotId={review.spotId} reviewObj={review} formType="Update a User Review" />}
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
        </div>
    </>
    )


}
