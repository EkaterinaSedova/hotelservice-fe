import React from 'react';

// 0_0 КАТЯ ИЗ БУДУЩЕГО, НЕ ЮЗАЙ ЗДЕСЬ ДИСПАТЧ!!!!

const Booking = ({booking}) => {
    return (
        <div>
            inDate: {booking.inDate};
            outDate: {booking.outDate};
            <button>go to hotel page</button>
            <button>delete this booking</button>
        </div>
    );
};

export default Booking;