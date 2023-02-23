import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { NavLink, useParams, useHistory } from 'react-router-dom';
import './MyBookings.css'
import { getMyBookings, deletingBooking } from "../../../store/bookings";
import moment from 'moment'
import { editSpot } from "../../../store/spots";


const MyBookings = () => {
    const dispatch = useDispatch()
    const [isLoaded, setLoaded] = useState(false)
    const bookings = useSelector(state => Object.values(state.bookings.allBookings))
    useEffect(() => {
        dispatch(getMyBookings()).then(() => setLoaded(true))
    }, [dispatch])

    const formatDate = (start, end) => {
        const startFormatted = moment(start).format("MMM D");
        const endFormatted = moment(end).format("D, YYYY");
        console.log(start.slice(5, 7), end.slice(5, 7))
        if (start.slice(5, 7) == end.slice(5, 7)) {

            return `${startFormatted} - ${endFormatted}`
        }
        else {
            const newEnd = moment(end)
            const newEndString = newEnd.format('MMM D')
            const yearString = newEnd.format('YYYY')
            return `${startFormatted} - ${newEndString}, ${yearString}`
        }
    }
    console.log('bookings', bookings[0]?.endDate.slice(5, 7), bookings[0]?.startDate.slice(5, 7))
    return isLoaded && (
        <div className="myBookingsContainer">
            <div className="myBookingsHeader">
                Your Bookings
            </div>
            {!bookings &&
                <div>
                    No Bookings Yet!
                </div>
            }
            <div className="indiBookingContainer">
                {bookings.map(booking => (
                    <div className="indiBooking">
                        <div className="indiBookingLeft">
                            <div className="indiBookingTopLeft">
                                {booking?.Spot?.name}
                            </div>
                            <div className="indiBookingBot">
                                <div className="indiBookingBotX">
                                    <div className="indiBookingBotLeft">
                                        {formatDate(booking?.startDate, booking?.endDate)}

                                    </div>
                                    <div className="indiBookingBotRight">
                                        {booking?.Spot?.address}
                                        <br />
                                        {booking?.Spot?.city} {booking?.Spot?.country}

                                    </div>
                                </div>
                                <div className="indiBookingBotY">
                                    <NavLink to={`/bookings/${booking?.Spot?.id}/${booking?.id}`}>
                                        <button>Edit Booking</button>
                                    </NavLink>
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault()
                                            await dispatch(deletingBooking(booking.id)).then(() => window.location.reload())
                                        }}
                                    >Delete Booking</button>
                                </div>
                            </div>
                        </div>
                        <div className="indiBookingRight">
                            <img className='indiBookingPic' src={booking?.Spot?.previewImage} />
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default MyBookings
