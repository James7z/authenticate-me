import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
//import { csrfFetch } from '../../store/csrf';
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import { getSpotBookings, createBooking } from '../../store/spot'
import './BookingForm.css';

const BookingsModal = ({ spot }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const bookings = useSelector(state => state.spots.bookings);
    const singleSpot = useSelector(state => state.spots.singleSpot);

    const [startDate, setStartDate] = useState(0);
    const [filledDates, setFilledDates] = useState(null);
    const [days, setDays] = useState(0);
    const [errors, setErrors] = useState('');


    const getDaysArray = (start, end, isCount) => {
        const array = [];

        if (isCount && startDate === 0) return [];

        start = new Date(start);
        start = new Date(start.setDate(start.getDate()));
        end = new Date(end);

        if (isSameDay(start, end)) return [start];

        let currDate = start;
        while (currDate.getDate() <= end.getDate()) {
            array.push(currDate);
            const nextDate = currDate.setDate(currDate.getDate() + 1);
            currDate = new Date(nextDate);
        }

        return array;
    };

    const getSpotFilledDates = () => {
        let newFilledDates = [];

        if (bookings?.length) {

            for (let i = 0; i < bookings.length; i++) {
                const booking = bookings[i];
                const bookingDays = getDaysArray(booking.startDate, booking.endDate);
                if (Array.isArray(bookingDays)) {
                    newFilledDates = [...newFilledDates, ...bookingDays];
                }
            };

            setFilledDates(newFilledDates);
        } else {
            setFilledDates([]);
        }
    };

    useEffect(() => {
        const getBookings = async () => await dispatch(getSpotBookings(spot.id));
        getBookings();
    }, [spot, singleSpot, startDate]);

    useEffect(() => {
        getSpotFilledDates();
    }, [bookings, spot, singleSpot, startDate]);

    useEffect(() => {
        setErrors('');
    }, [startDate])

    useEffect(() => {
        const daysCount = getDaysArray(startDate[0], startDate[1], true);
        setDays(daysCount?.length);
    }, [startDate]);

    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }

    const tileDisabled = ({ date, view }) => {
        if (!filledDates) return false;
        return filledDates.find(dDate => isSameDay(dDate, date));
    }

    if (!spot?.id || spot?.id !== singleSpot?.id) return null;

    const handleBookSpot = async () => {
        for (let i = 0; i < startDate.length - 1; i++) {
            if (filledDates.find(filledDate => isSameDay(filledDate, startDate[i]))) {
                return setErrors('You have selected a booked date.');
            };
        }

        const data = {};

        if (days === 1) data.startDate = startDate[0];
        else data.startDate = startDate[0];

        if (days === 1) data.endDate = startDate[0];
        else data.endDate = startDate[1];
        console.log(data)

        const ret = dispatch(createBooking(spot.id, data));
        if (!ret) return setErrors('Failed to create booking. Try again.');

        setFilledDates([]);
        setDays(0);

        return closeModal();
    }

    return (<div className='bookings-modal-container'>
        <div className='bookings-modal-div'>
            <h2>Book {spot?.name}</h2>

            {errors.length ?
                <p>{errors}</p>
                : ''}

            <Calendar
                onChange={setStartDate}
                value={startDate || null}
                minDate={new Date()}
                minDetail='decade'
                calendarType='US'
                selectRange
                tileDisabled={tileDisabled}
            ></Calendar>

            {days ? <div className='bookings-total-div'>
                <p className='bookings-total-p'>{`Book ${days} ${days > 1 ? 'nights' : 'night'} for $${days * spot.price}.00`}</p>
            </div>
                : ''}

            {(days && !errors.length) ? <div className='bookings-button-div'>
                <button className='main-button-style bookings-button'
                    onClick={handleBookSpot}
                >Book</button>

                <button className='main-button-style bookings-button'
                    onClick={closeModal}
                >Cancel</button>
            </div> : ''}

        </div>
    </div>)
};

export default BookingsModal;
