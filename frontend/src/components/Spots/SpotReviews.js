import OpenModalButton from "../OpenModalButton";
import DeleteReviewForm from '../Reviews/DeleteReviewForm'
import ReviewForm from "../Reviews/ReviewForm";

export default function SpotReviews({ reviewList, reviewMsg, currUserId }) {
    if (!reviewList) return (null)
    if (reviewList.length === 0) return (<div> {reviewMsg}</div>)
    const options = { year: 'numeric', month: 'long' };

    return (<>
        {
            reviewList.map(review => (
                <div key={review.id} className='spot-details-review-card'>
                    <div>{review.User.firstName}</div>
                    <div>{(new Date(review.createdAt)).toLocaleDateString(undefined, options)}</div>
                    <div>{review.review}</div>

                    <div className={review.userId === currUserId ? "normal" : "hidden"}>
                        <span>       <OpenModalButton
                            buttonText="Update"
                            modalComponent={<ReviewForm spotId={review.spotId} reviewObj={review} formType="Update a Spot Review" />}
                        />
                        </span>
                        <span>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewForm spotId={review.spotId} reviewId={review.id} formType="Spot Review" />}

                            />
                        </span>
                    </div>
                </div>
            ))
        }

    </>
    )
}
