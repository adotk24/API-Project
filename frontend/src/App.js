import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { GetAllSpots } from './components/Spots/GetAllSpots'
import { GetOneSpot } from './components/Spots/GetOneSpot';
import { MySpots } from './components/Spots/GetMySpots'
import EditSpot from './components/Spots/EditSpot'
import AddSpot from "./components/Spots/AddSpot";
import { AddReview } from './components/AddReview'
import MyBookings from "./components/Bookings/MyBookings/MyBookings";
import EditBooking from "./components/Bookings/EditBooking/EditBooking";
import AboutPage from "./components/AboutPage/AboutPage";

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
          <Route path='/spots/:spotId/edit' exact>
            <EditSpot />
          </Route>
          <Route path='/spots/:spotId/review' exact>
            <AddReview />
          </Route>
          <Route path='/' exact>
            <GetAllSpots />
          </Route>
          <Route path='/spots/mine' exact>
            <MySpots />
          </Route>
          <Route path='/spots/add' exact>
            <AddSpot />
          </Route>
          <Route path='/spots/:spotId' exact>
            <GetOneSpot />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/bookings/mine' exact >
            <MyBookings />
          </Route>
          <Route path='/bookings/:spotId/:bookingId' exact>
            <EditBooking />
          </Route>
          <Route path='/about' exact>
            <AboutPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
