// CalendarDates.js
import React from 'react';

const CalendarDates = ({ currentDate, events, dragOverEvent, handleDragOver, handleDrop, handleDragStart, handleDateCellClick }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDateCells = () => {
    const firstDayIndex = getFirstDayOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const dateCells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      dateCells.push(<div key={`empty-${i}`} className="calendar-date empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const eventOnDate = events.find(event =>
        new Date(event.date).toDateString() === eventDate.toDateString()
      );

      dateCells.push(
        <div
          key={`day-${day}`}
          className={`calendar-date ${dragOverEvent === eventOnDate ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          draggable={Boolean(eventOnDate)}
          onDragStart={(e) => handleDragStart(e, eventOnDate)}
          onClick={() => handleDateCellClick(eventDate)}
        >
          {day}
          {eventOnDate && (
            <div className="event">
              <div
                className="event-info"
                onClick={() => handleEditEvent(eventOnDate)}
              >
                {eventOnDate.title}
                <span className="event-time">{eventOnDate.time}</span>
              </div>
              <div className="event-actions">
                <button onClick={() => handleEditEvent(eventOnDate)}>Edit</button>
                <button onClick={() => handleDeleteEvent(eventOnDate)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return dateCells;
  };

  return (
    <div className="calendar-dates">
      {renderDateCells()}
    </div>
  );
};

export default CalendarDates;
