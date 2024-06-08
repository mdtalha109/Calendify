import React from 'react';

const CalendarWeekdays = ({ daysOfWeek }) => {
  return (
    <div className="calendar-weekdays">
     {
       daysOfWeek.map((day, index) => (
        <div key={`day-${index}`} className="calendar-day  text-center opacity-40">
          {day}
        </div>
      ))
     }
    </div>
  );
};

export default CalendarWeekdays;