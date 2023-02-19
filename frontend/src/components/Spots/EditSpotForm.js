import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotForm from "./SpotForm";
import { useHistory } from "react-router-dom";

export default function EditSpotForm() {
    const { spotId } = useParams();
    const history = useHistory();
    const currUser = useSelector(state => state.session.user);
    let spot = {};
    spot = useSelector(state => {
        if (state.spots.allSpots) return state.spots.allSpots[spotId]
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
    if (!currUser) {
        return history.push('/')
    }

    console.log(spot)
    return <SpotForm spot={spot} formType="Update you Spot" />
    // return (
    //     <h2>Update</h2>
    // )
};
