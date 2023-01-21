import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { NavLink, useParams, useHistory } from 'react-router-dom';
import './MyBookings.css'
import { getMyBookings } from "../../../store/bookings";
import moment from 'moment'


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
        return `${startFormatted} - ${endFormatted}`

    }

    console.log('BOOKINGS', bookings)
    return isLoaded && (
        <div className="myBookingsContainer">
            <div className="myBookingsHeader">
                Your Bookings
            </div>
            {!bookings &&
                <div>
                    NO BOOKINGS YET
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
                                    <button>Edit Booking</button>
                                    <button>Delete Booking</button>
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
