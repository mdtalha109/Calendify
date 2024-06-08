// CalendarDates.js
import React from 'react';

const CalendarDates = ({ currentDate, events, dragOverEvent, handleDragOver, handleDrop, handleDragStart, handleDateCellClick,handleEditEvent, handleDeleteEvent }) => {
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
    const today = new Date();
    const dateCells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      dateCells.push(<div key={`empty-${i}`} className="calendar-date empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const eventOnDate = events.find(event =>
        new Date(event.date).toDateString() === eventDate.toDateString()
      );

      const isToday = eventDate.toDateString() === today.toDateString();

      dateCells.push(
        <div
          key={`day-${day}`}
          className={`calendar-date text-center p-1 h-[100px] ${isToday ? 'relative text-center rounded-md cursor-pointer transition-colors hover:bg-gray-100 hover:bg-gray-800 bg-gray-950 text-white dark:bg-primary dark:text-gray-950' : ''} ${dragOverEvent === eventOnDate ? 'drag-over' : ''}`}
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
                style={{ backgroundColor: eventOnDate.color }}
                onClick={(e) => handleEditEvent(e, eventOnDate)}
              >
                {eventOnDate.title}
                <span className="event-time">{eventOnDate.time}</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    return dateCells;
  };

  return (
    <div className="grid grid-cols-7 gap-3">
      {renderDateCells()}
    </div>
  );
};

export default CalendarDates;
