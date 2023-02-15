import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './SpotForm.css'

export default function CreateSpotForm() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [spotImage1, setSpotImage1] = useState('');
    const [spotImage2, setSpotImage2] = useState('');
    const [spotImage3, setSpotImage3] = useState('');
    const [spotImage4, setSpotImage4] = useState('');
    const [spotImage5, setSpotImage5] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {

        let errors = [];
        if (country.length === 0) errors.push("Country field is required");
        if (address.length === 0) errors.push("Address field is required");
        setErrors(errors)
    }, [country, address, city, state, lat, lng, description, name, price, spotImage1, spotImage2, spotImage3, spotImage4, spotImage5])

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log({ country, address })
        // dispatch(signup({ country }))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     });

        history.push('/spots/1')
    };

    return (
        <>
            <div>
                <div className="create-spot-form-container">
                    <form
                        className="create-spot-form"
                        onSubmit={handleSubmit}
                    >
                        <h2>Create a new Spot</h2>
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
                                            onChange={e => setState(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </span>
                        </div>
                        <div className="create-spot-form-lable-1 create-spot-form-2-column">
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
                        </div>

                        <h3>Describe your place to guests</h3>
                        <div>
                            <p>Mention the best features of your space, any special amentities like
                                fast wif or parking, and what you love about the neighborhood.</p>
                        </div>
                        <div>
                            <textarea
                                name="description"
                                value={description}
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
                                onChange={e => setSpotImage1(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage2"
                                value={spotImage2}
                                onChange={e => setSpotImage2(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage3"
                                value={spotImage3}
                                onChange={e => setSpotImage3(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage4"
                                value={spotImage4}
                                onChange={e => setSpotImage4(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className="create-spot-form-lable-1 create-spot-form-image"
                                type="text"
                                name="spotImage5"
                                value={spotImage5}
                                onChange={e => setSpotImage5(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={errors.length > 0}
                            >
                                Create Spot
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
