

const LOAD_SPOTS = 'spot/LOAD';
const LOAD_SPOT_DETAILS = 'spot/LOAD_DETAILS ';

const loadSpots = spotList => ({
    type: LOAD_SPOTS,
    spotList
});

const loadSpotDetails = spotDetails => ({
    type: LOAD_SPOT_DETAILS,
    spotDetails
});

export const getSpot = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spotList = await response.json();
        //console.log("**********Spot List are:")
        //console.log(spotList)
        dispatch(loadSpots(spotList));
    }
};

export const getSpotDetails = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spotDetails = await response.json();
        // console.log("**********Spot Details are:")
        // console.log(spotDetails)
        dispatch(loadSpotDetails(spotDetails));
    }
};



const initialState = {};

const sortList = (list) => {
    return list.sort((spotA, spotB) => {
        return spotA.number - spotB.number;
    }).map((spot) => spot.id);
};


export default function spotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            action.spotList.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            //console.log("***allSpots are");
            //console.log(allSpots);
            return {
                ...state,
                allSpots: { ...allSpots },
                orderedSpotList: sortList(action.spotList.Spots)
            };
        case LOAD_SPOT_DETAILS:
            // console.log(action.spotDetails)
            const singleSpot = { ...action.spotDetails };
            return {
                ...state,
                singleSpot
            }

        default:
            return state;
    }
}
