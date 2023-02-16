import SpotForm from "./SpotForm";

export default function CreateSpotForm() {
    const spot = { ownerId: '', country: '', address: '', city: '', state: '', lat: '', lng: '', description: '', name: '', price: '' };
    return <SpotForm spot={spot} formType="Create a New Spot" />
};
