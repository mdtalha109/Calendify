// CalendarLayout.js
import React, { useState, useEffect } from 'react';
import CalendarHeader from '../CalendarHeader/CalendarHeader';

const CalendarLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        onNextMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
      />
    </div>
  );
};

export default CalendarLayout;