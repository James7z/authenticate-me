import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createASpot, createASpotImage, getSpotDetails, updateASpot } from "../../store/spot";
import './SpotForm.css'

export default function SpotForm({ spot, formType }) {
    // console.log('spotDetails is ')
    // console.log(spot)
    const dispatch = useDispatch();
    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    // const [lat, setLat] = useState();
    // const [lng, setLng] = useState();
    const lat = 37.7645358;
    const lng = 22.4730327;
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [spotImage1, setSpotImage1] = useState(spot.previewImage);
    const [spotImage2, setSpotImage2] = useState('');
    const [spotImage3, setSpotImage3] = useState('');
    const [spotImage4, setSpotImage4] = useState('');
    const [spotImage5, setSpotImage5] = useState('');
    //const [spotImages, setSpotImages] = useState({});
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    let ownerId;
    let isOwner = true;
    const currUser = useSelector(state => state.session.user);
    if (currUser) ownerId = currUser.id;
    // const spotDetails = useSelector(state => {
    //     if (state.spots.singleSpot) return { ...state.spots.singleSpot }
    // })

    const { spotId } = useParams();

    let buttonStr = '';
    if (formType === "Create a New Spot") buttonStr = "Create Spot";
    if (formType === "Update you Spot") {
        buttonStr = "Update Spot";

    }


    useEffect(() => {
        //if (formType === "Update you Spot") dispatch(getSpotDetails(spotId))
        if (spotId) dispatch(getSpotDetails(spotId))
        console.log("Use effect getSpotDetails ")
    }, [])

    useEffect(() => {
        let errors = [];
        if (country.length === 0) errors.push("Country field is required");
        if (address.length === 0) errors.push("Address field is required");
        if (city.length === 0) errors.push("City field is required");
        if (state.length === 0) errors.push("State field is required");
        if (name.length === 0) errors.push("Spot title field is required");
        if (price < 0 || isNaN(price)) errors.push("Please provide a valid price")
        if (!spotImage1) errors.push("Please provide at least one photo to publish your spot.")
        // console.log("Use effect check errors ")

        setErrors(errors)
    }, [country, address, city, state,
        //lat, lng,
        description, name, price, spotImage1, spotImage2, spotImage3, spotImage4, spotImage5])

    const handleSubmit = async (e) => {

        e.preventDefault();
        //console.log({ country, address })
        const payload = { country, address, city, state, lat, lng, description, name, price };
        const spotImages = [];
        if (spotImage1) spotImages.push(spotImage1);
        if (spotImage2) spotImages.push(spotImage2);
        if (spotImage3) spotImages.push(spotImage3);
        if (spotImage4) spotImages.push(spotImage4);
        if (spotImage5) spotImages.push(spotImage5);
        if (formType === "Create a New Spot") {
            const data = await dispatch(createASpot(payload))
            if (spotImages.length > 0) {
                spotImages.forEach(spotImage => {
                    const imageObj = { "url": spotImage, "preview": true }
                    dispatch(createASpotImage({ imageObj, spotId: data.id }))
                })
            }
            history.push(`/spots/${data.id}`)
        }

        if (formType === "Update you Spot") {
            console.log("payload is ")
            console.log(payload)
            const data = await dispatch(updateASpot({ payload, spotId }))

            history.push(`/spots/${data.id}`)
        }




    };

    return (
        <>
            <div>
                <div className="create-spot-form-container">
                    <form
                        className="create-spot-form"
                        onSubmit={handleSubmit}
                    >
                        <h2>{formType}</h2>
                        <h3>Where's your place located?</h3>
                        <div>Guests will only get your exact address once they booked a reservation.</div>
                        <ul className="errors">
                            {errors.length > 0 && errors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                        <label>
                            Country
                            <div>
                                <input className="create-spot-form-lable-1"
                                    type="text"
                                    placeholder="Country"
                                    name="country"
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                />
                            </div>
                        </label>
                        <label>
                            Street Address
                            <div>
                                <input className="create-spot-form-lable-1"
                                    type="text"
                                    name="address"
                                    value={address}
                                    placeholder="Address"
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </div>
                        </label>
                        <div className="create-spot-form-lable-1 create-spot-form-2-column">
                            <span className="create-spot-form-lable-2">
                                <label>
                                    City
                                    <div>
                                        <input
                                            type="text"
                                            name="city"
                                            value={city}
                                            placeholder="City"
                                            onChange={e => setCity(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </span>
                            <p>{", "}</p>
                            <span className="create-spot-form-lable-2">
                                <label>
                                    State
                                    <div>
                                        <input
                                            type="text"
                                            name="state"
                                            value={state}
                                            placeholder="State"
                                            onChange={e => setState(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </span>
                        </div>
                        {/* <div className="create-spot-form-lable-1 create-spot-form-2-column">
                            <span className="create-spot-form-lable-2">
                                <label>
                                    Latitude
                                    <div>
                                        <input
                                            type="text"
                                            name="lat"
                                            value={lat}
                                            onChange={e => setLat(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </span>
                            <p>{", "}</p>
                            <span className="create-spot-form-lable-2">
                                <label>
                                    Longitude
                                    <div>
                                        <input
                                            type="text"
                                            name="lng"
                                            value={lng}
                                            onChange={e => setLng(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </span>
                        </div> */}

                        <h3>Describe your place to guests</h3>
                        <div>
                            <p>Mention the best features of your space, any special amentities like
                                fast wif or parking, and what you love about the neighborhood.</p>
                        </div>
                        <div>
                            <textarea
                                name="description"
                                value={description}
                                placeholder="Description"
                                onChange={e => setDescription(e.target.value)}
                                className="create-spot-form-lable-1"
                            >

                            </textarea>
                        </div>
                        <h3>Create a title for your spot</h3>
                        <div>
                            <p>Catch guests' attention with a spot title that highlights what makes
                                your place special.
                            </p>
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1"
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Name of your spot"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <h3>Set a base price for your spot
                        </h3>
                        <div>
                            <p>Competitive pricing can help your listing stand out and rank higher
                                in search results.
                            </p>
                        </div>
                        <div>
                            <label> $
                                <input className="create-spot-form-lable-1 create-spot-form-price"
                                    type="text"
                                    name="price"
                                    value={price}
                                    placeholder="Price per night(USD)"
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </label>
                        </div>

                        <h3>Liven up your spot with photos
                        </h3>
                        <div>
                            <p>Submit a link to at least one photo to publish your spot.
                            </p>
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage1"
                                value={spotImage1}
                                placeholder="Preview Image URL"
                                onChange={e => setSpotImage1(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage2"
                                value={spotImage2}
                                placeholder="Image URL"
                                onChange={e => setSpotImage2(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage3"
                                value={spotImage3}
                                placeholder="Image URL"
                                onChange={e => setSpotImage3(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage4"
                                value={spotImage4}
                                placeholder="Image URL"
                                onChange={e => setSpotImage4(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage5"
                                value={spotImage5}
                                placeholder="Image URL"
                                onChange={e => setSpotImage5(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={errors.length > 0}
                            >
                                {buttonStr}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
