import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotForm from "./SpotForm";
import { useHistory } from "react-router-dom";

export default function EditSpotForm() {
    const { spotId } = useParams();
    const history = useHistory();
    const currUser = useSelector(state => state.session.user);
    const spot = useSelector(state => {
        if (state.spots.allSpots) return state.spots.allSpots[spotId]
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
