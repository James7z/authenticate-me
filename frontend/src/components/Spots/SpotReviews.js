import OpenModalButton from "../OpenModalButton";
import DeleteReviewForm from '../Reviews/DeleteReviewForm'

export default function SpotReviews({ reviewList, reviewMsg, currUserId }) {
    if (!reviewList) return (null)
    if (reviewList.length === 0) return (<div> {reviewMsg}</div>)

    const options = { year: 'numeric', month: 'long' };

    // console.log("In review list :")
    // console.log(reviewList)

    return (<>
        {
            reviewList.map(review => (
                <div key={review.id} className='spot-details-review-card'>
                    <div>{review.User.firstName}</div>
                    <div>{(new Date(review.createdAt)).toLocaleDateString(undefined, options)}</div>
                    <div>{review.review}</div>
                    <div className={review.userId === currUserId ? "normal" : "hidden"}>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteReviewForm spotId={review.spotId} reviewId={review.id} />}

                        />

                    </div>
                </div>
            ))
        }

    </>
    )
}
