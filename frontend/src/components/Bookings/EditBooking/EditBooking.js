import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import spotsReducer from '../../../store/spots';
import { getBookingsBySpot, edittingBooking } from '../../../store/bookings';
import { useParams, useHistory } from 'react-router-dom';
import { getOneSpot } from '../../../store/spots';
import './EditBooking.css'
const EditBooking = () => {
    const { spotId, bookingId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setLoaded] = useState(false)
    const bookings = useSelector(state => Object.values(state.bookings.allBookings))
    const spot = useSelector(state => state.spots.spot);
    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(() => {
            dispatch(getBookingsBySpot(spotId)).then(() => {
                setLoaded(true)
            })
        })
    }, [dispatch, spot.id])
    const daBooking = bookings.find(booking => booking.id == bookingId)

    console.log('spot', daBooking?.endDate)

    const [startDate, setStartDate] = useState(moment(daBooking?.startDate))
    const [endDate, setEndDate] = useState(moment(daBooking?.endDate))
    const [focusedInput, setFocusedInput] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])
    const [vErrors, setVErrors] = useState([])

    useEffect(() => {
        existingBookings(bookings)
    }, [dispatch, bookings])

    useEffect(() => {
        blockedDates.push(bookedDates)
    }, [dispatch, bookedDates])

    const handleDateChanges = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const blockDates = (day) => {
        const blockedDates = new Set([...bookedDates])
        return blockedDates.has(moment(day).format('YYYY-MM-DD'))
    }

    // add custom clear. input is right after div classname DateInput
    const existingBookings = (bookings) => {
        bookings.forEach(booking => {
            if (booking.id != bookingId) {
                const { startDate, endDate } = booking
                let date = moment(startDate)
                let dateEnd = moment(endDate)
                while (date <= dateEnd) {
                    bookedDates.push(moment(new Date(date)).format('YYYY-MM-DD'))
                    date.add(1, 'days')
                }
            }
        })
    }

    const checkGapDays = (day) => {
        if (day > moment()) {
            const blockedDates = new Set([...bookedDates])
            return blockedDates.has(moment(day).add(1, 'days').format('YYYY-MM-DD'))
        }
    }

    const validatedDates = (day) => {

        if (!startDate) {
            return moment(startDate).diff(day, 'days') > 0
        }
        if (startDate) {

            const blockedDates = [...bookedDates]
            let earliestBlockedDate = blockedDates[0]

            for (let i = 0; i < blockedDates.length; i++) {
                if (moment(blockedDates[i]) > moment(startDate)) {
                    earliestBlockedDate = blockedDates[i]
                    break
                }
            }
            if (moment(startDate).diff(earliestBlockedDate, 'days') > 0) {
                return moment(startDate).diff(day, 'days') > 0
            }
            return moment(startDate).diff(day, 'days') > 0 || moment(day).format('YYYY-MM-DD') > earliestBlockedDate
        }
    }

    useEffect(() => {
        const errors = []
        if (startDate?.toString().split(' ').slice(1, 4).join(' ') === endDate?.toString().split(' ').slice(1, 4).join(' ')) errors.push("Must book for at least 1 day")
        if (!startDate) errors.push('Must include Start Date')
        if (!endDate) errors.push('Must include End Date')
        setVErrors(errors)
    }, [startDate, endDate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!vErrors.length) {
            const values = { startDate, endDate }
            const created = await dispatch(edittingBooking(bookingId, values))
            if (created) history.push(`/bookings/mine`)
        }
    }


    return (
        <div className="edit-booking-form-container">
            <div>
                <span>${spot.price} <span>night</span> </span>
                <span>{`★ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : "New"}`} · <span>{`${spot.numReviews} reviews`} </span></span>

            </div>
            <div className='div-date-range-picker'>
                <form onSubmit={handleSubmit}>
                    <DateRangePicker
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId="startDateId" // PropTypes.string.isRequired,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDateId="endDateId" // PropTypes.string.isRequired,
                        onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                        showClearDates={true}
                        reopenPickerOnClearDates={startDate}
                        minimumNights={1}
                        minDate={moment(new Date())}
                        isDayBlocked={blockDates}
                        startDatePlaceholderText="Add Start Date"
                        endDatePlaceholderText="Add End Date"
                        hideKeyboardShortcutsPanel={true}
                        isDayHighlighted={checkGapDays}
                        isOutsideRange={validatedDates}
                        calendarInfoPosition={"bottom"}

                    />
                    <div>${spot.price} x {endDate?.diff(startDate, 'days') || 0} nights <span>${spot.price * (endDate?.diff(startDate, 'days') || 0)}</span></div>
                    <div>Cleaning fee <span>$100</span></div>
                    <div>Service Fee <span>${((spot.price * 3) * 0.14).toFixed(0)}</span></div>
                    <div> Total before taxes <span>${+(spot.price * (endDate?.diff(startDate, 'days') || 0)) + +((spot.price * 3) * 0.14).toFixed(0) + 100}</span></div>
                    <button>Reserve</button>
                </form>
            </div>
        </div >
    )
}

export default EditBooking
