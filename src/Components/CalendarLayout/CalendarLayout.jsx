// CalendarLayout.js
import React, { useState, useEffect } from 'react';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarWeekdays from '../CalendarWeekdays/CalendarWeekdays'

const CalendarLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        onNextMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
      />

      <div className="calendar-body">
        <CalendarWeekdays daysOfWeek={daysOfWeek} />
      </div>
    </div>
  );
};

export default CalendarLayout;