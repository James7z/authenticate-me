const LOAD_SPOTS = 'spot/LOAD';

const loadSpots = spotList => ({
    type: LOAD_SPOTS,
    spotList
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
            console.log("***allSpots are");
            console.log(allSpots);
            return {
                ...state,
                allSpots: { ...allSpots },
                orderedSpotList: sortList(action.spotList.Spots)
            };
        default:
            return state;
    }
}
