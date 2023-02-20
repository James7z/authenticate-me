import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SpotForm from "./SpotForm";
import { useHistory } from "react-router-dom";
import { getSpotDetails } from "../../store/spot";

export default function EditSpotForm() {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    let spot = {};
    let previewImage = '';
    spot = useSelector(state => {
        if (state.spots.singleSpot) {
            previewImage = (state.spots.singleSpot.SpotImages.find(image => image.preview === true)).url;
            return { ...state.spots.singleSpot, previewImage }
        }
        else return {
            country: '',
            address: '',
            city: '',
            state: '',
            // lat: '', lng: '',
            description: '',
            name: '',
            price: ''
        }
    });

    useEffect(() => {
        if (spotId) dispatch(getSpotDetails(spotId))
        //console.log("Use effect getSpotDetails ")
    }, [dispatch, spotId])


    if (!currUser || (spot.ownerId && currUser.id !== spot.ownerId)) {
        return history.push('/')
    }

    return <SpotForm spot={spot} formType="Update you Spot" />
};
