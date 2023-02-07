import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import spotsReducer from '../../../store/spots';
import './AddBooking.css'
import { getBookingsBySpot, addingBooking } from '../../../store/bookings';
import { useParams, useHistory } from 'react-router-dom';
import { getReviewById } from '../../../store/reviews';

const AddBooking = ({ bookings, spot, reviews }) => {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [focusedInput, setFocusedInput] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])
    const [vErrors, setVErrors] = useState([])
    const history = useHistory()


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
            const { startDate, endDate } = booking
            let date = moment(startDate)
            let dateEnd = moment(endDate)
            while (date < dateEnd) {
                bookedDates.push(moment(new Date(date)).format('YYYY-MM-DD'))
                date.add(1, 'days')
            }
        })
    }

    const checkGapDays = (day) => {
        if (day > moment()) {
            return bookings.find(booking => moment(booking.startDate).diff(day, 'days') == 1)
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
        console.log('is this hitting')
        if (!vErrors.length) {
            const values = { startDate, endDate }
            const created = await dispatch(addingBooking(spot?.id, values))
            if (created) history.push(`/bookings/mine`)
        }

    }

    const calendarInfo = (e) => {
        return <div className="calendar-info-bottom">
            <button onClick={handleClearDatesClick}>Clear dates</button>
        </div>
    }

    const handleClearDatesClick = (e) => {
        e.preventDefault()
        setStartDate()
        setEndDate()
        document.getElementById('startDateId').focus()
    }






    return (
        <div className="booking-form-container">
            <div className='booking-form-headers'>
                <div className='header-first'>
                    <div className='header-price'>
                        ${spot.price}
                    </div>
                    <div className='header-rest'>
                        night
                    </div>

                </div>
                <div className='header-last'>

                    <div className='header-right'>{`★ ${spot.numReviews ? Number(spot.avgRating).toFixed(1) : "New"}`} · {`${spot.numReviews} reviews`} </div>
                </div>

            </div>
            <div className='actual-form'>
                <form
                    className='booking-form'
                    onSubmit={handleSubmit}>
                    <DateRangePicker
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId="startDateId" // PropTypes.string.isRequired,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDateId="endDateId" // PropTypes.string.isRequired,
                        onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                        reopenPickerOnClearDates={startDate}
                        minimumNights={1}
                        minDate={moment(new Date())}
                        isDayBlocked={blockDates}
                        startDatePlaceholderText="Start"
                        endDatePlaceholderText="End"
                        hideKeyboardShortcutsPanel={true}
                        isDayHighlighted={checkGapDays}
                        isOutsideRange={validatedDates}
                        calendarInfoPosition={"bottom"}
                        renderCalendarInfo={calendarInfo}

                    />
                    <button className='booking-btn'>Reserve</button>
                </form>
                <div className='booking-bot'>
                    <div className='bot-content'>
                        <div>${spot.price} x {endDate?.diff(startDate, 'days') || 0} nights <span>${spot.price * (endDate?.diff(startDate, 'days') || 0)}</span></div>
                        <div>Cleaning fee <span>$100</span></div>
                        <div>Service Fee <span>${((spot.price * 3) * 0.14).toFixed(0)}</span></div>
                        <div> Total before taxes <span>${+(spot.price * (endDate?.diff(startDate, 'days') || 0)) + +((spot.price * 3) * 0.14).toFixed(0) + 100}</span></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddBooking
