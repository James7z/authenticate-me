import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { createASpotReview, updateASpotReview } from "../../store/spot";
import { updateAReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import './BookingForm.css';


export default function BookingForm({ spotId, reviewObj, formType }) {
    const [stars, setStars] = useState(reviewObj.stars);
    const [review, setReview] = useState(reviewObj.review);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(() => {
        let errors = [];
        if (review.length < 10) errors.push("Please provide review at least 10 characters");
        if (stars < 1 || stars > 5) errors.push("Stars should between 1 and 5");

        setErrors(errors)
    }, [review, stars])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { review, stars }
        //console.log('payload', payload)
        if (errors.length === 0) {
            if (formType === "Create a Review") {
                dispatch(createASpotReview(payload, spotId)).then(closeModal)
            }
            if (formType === "Update a User Review") {
                dispatch(updateAReview(payload, reviewObj.id)).then(closeModal)
            }
            if (formType === "Update a Spot Review") {
                dispatch(updateASpotReview(payload, reviewObj.id, spotId)).then(closeModal)
            }
        }
    }

    return (
        <>

            <form onSubmit={handleSubmit} className="review-form">
                <h1>How was your stay?</h1>
                <ul className="errors">
                    {errors.length > 0 && errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <div>
                    <textarea placeholder="Leave your review here..."
                        className="reviewTextarea"
                        value={review}
                        onChange={e => setReview(e.target.value)}
                    >
                    </textarea></div>
                <div><lable>Stars
                    <ul className="rate-area">
                        <input type="radio" id="5-star" value="5" onClick={e => setStars(e.target.value)} />
                        <label htmlFor="5-star" title="Amazing">5 stars</label>
                        <input type="radio" id="4-star" value="4" onClick={e => setStars(e.target.value)} />
                        <label htmlFor="4-star" title="Good">4 stars</label>
                        <input type="radio" id="3-star" value="3" onClick={e => setStars(e.target.value)} />
                        <label htmlFor="3-star" title="Average">3 stars</label>
                        <input type="radio" id="2-star" value="2" onClick={e => setStars(e.target.value)} />
                        <label htmlFor="2-star" title="Not Good">2 stars</label>
                        <input type="radio" id="1-star" required=""
                            value="1" onClick={e => setStars(e.target.value)} />
                        <label htmlFor="1-star" title="Bad">1 star</label>
                    </ul>

                </lable></div>
                <div>
                    <button disabled={errors.length > 0} >Submit your review</button>
                </div>


            </form>
        </>
    )
}
