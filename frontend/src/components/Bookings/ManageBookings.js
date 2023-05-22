
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getUserBookings } from "../../store/booking";
import DeleteBookingForm from "./DeleteBookingForm";
import OpenModalButton from "../OpenModalButton";
import BookingForm from "./BookingForm";
import './BookingForm.css';

export default function ManageBookings() {

    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    const currUserId = currUser.id
    const curDate = new Date();
    console.log(curDate)

    let bookingList = [];
    bookingList = useSelector(state => {
        if (state.bookings) return Object.values(state.bookings).sort((a, b) => b.id - a.id)
        else return []
    })

    useEffect(() => {
        if (currUser) dispatch(getUserBookings(currUser.id));
    }, [dispatch, currUser])

    if (bookingList.length === 0) return (
        <>
            <div className="manage-booking-container">
                <h2>My Bookings</h2>

            </div>
        </>
    )

    const options = { year: 'numeric', month: 'long' };

    return (<>
        <div className="manage-booking-container">
            <h2>My Bookings</h2>
            <div className="spot-nav" >
                {

                    bookingList.map(booking => (
                        <div key={booking.id} className='nav-spot-card'>
                            <NavLink to={`/spots/${booking.Spot.id}`} >
                                <div className="spot-image-container">

                                    <img className="spot-image"
                                        src={booking.Spot.previewImage}
                                        alt={"Image of " + booking.Spot.name}></img>

                                </div>
                                <div>Spot Name: {booking.Spot.name}</div>
                                <div>Start Date: {booking.startDate}</div>
                                <div>End Date: {booking.endDate}</div>
                            </NavLink>
                            <div className={booking.userId === currUserId && new Date(booking.startDate) >= curDate ? "normal" : "hidden"}>
                                <span>       <OpenModalButton
                                    buttonText="Change Date"
                                    modalComponent={<BookingForm spotId={booking.spotId} formType="Update a User Booking" />}
                                />

                                </span>
                                <span>
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteBookingForm bookingId={booking.id} formType="User Booking" />}

                                    />
                                </span>
                            </div>
                        </div>
                    ))

                }
            </div>
        </div>
    </>
    )


}
