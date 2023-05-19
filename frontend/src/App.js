import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import ManageSpots from "./components/Spots/ManageSpots";
import EditSpotForm from "./components/Spots/EditSpotForm";
import ManageReviews from "./components/Reviews/ManageReviews";
import ManageBookings from "./components/Bookings/ManageBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <AllSpots></AllSpots>
          </Route>
          <Route path='/spots/new' >
            <CreateSpotForm></CreateSpotForm>
          </Route>
          <Route path='/spots/current' >
            <ManageSpots />
          </Route>
          <Route path='/reviews/current' >
            <ManageReviews />
          </Route>
          <Route path='/bookings/current' >
            <ManageBookings />
          </Route>
          <Route path='/spots/:spotId/edit' >
            <EditSpotForm />
          </Route>
          <Route path='/spots/:spotId' >
            <SpotDetails></SpotDetails>
          </Route>

          <Route>
            Page Not Found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
