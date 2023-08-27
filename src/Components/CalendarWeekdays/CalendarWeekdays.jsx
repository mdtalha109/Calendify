import React from 'react';

const CalendarWeekdays = ({ daysOfWeek }) => {
  return (
    <div className="calendar-weekdays">
      {daysOfWeek.map((day) => (
        <div key={day} className="calendar-weekday">{day}</div>
      ))}
    </div>
  );
};

export default CalendarWeekdays;