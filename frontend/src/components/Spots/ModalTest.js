import OpenModalButton from "../OpenModalButton";

export const Greeting = () => {
    return (
        <OpenModalButton
            buttonText="Greeting"
            modalComponent={<h2>Hello World! TEst</h2>}
            onButtonClick={() => console.log("Greeting initiated")}
            onModalClose={() => console.log("Greeting completed")}
        />
    );
};
