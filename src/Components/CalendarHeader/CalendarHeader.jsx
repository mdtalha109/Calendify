// CalendarHeader.js
import React from 'react';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, handleOpenEventForm }) => {
  return (
    <header className="calendar-header">
      <button onClick={onPrevMonth}>Prev Month</button>
      <button onClick={handleOpenEventForm}>Create Event</button>
      <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <button onClick={onNextMonth}>Next Month</button>
    </header>
  );
};

export default CalendarHeader;