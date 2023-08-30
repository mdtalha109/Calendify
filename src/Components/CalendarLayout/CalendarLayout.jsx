// CalendarLayout.js
import React, { useState, useEffect } from 'react';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarWeekdays from '../CalendarWeekdays/CalendarWeekdays'

const CalendarLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEventFormVisible, setEventFormVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dragOverEvent, setDragOverEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateCellClick = (date) => {

    setSelectedDate(date);
    handleOpenEventForm();
  };

  const handleDragStart = (e, event) => {
    e.dataTransfer.setData('text/plain', event.title);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const finalDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${e.target.innerHTML}`;
    const sourceTitle = e.dataTransfer.getData('text/plain');
    const sourceEvent = events.find(event => event.title === sourceTitle);

    if (sourceEvent) {
      const updatedEvents = events.map(event =>
        event === sourceEvent
          ? { ...sourceEvent, date: finalDate }
          : event
      );

      setEvents(updatedEvents);
    }
  };

  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        onNextMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
      />

      <div className="calendar-body">
        <CalendarWeekdays daysOfWeek={daysOfWeek} />
        <CalendarDates
          currentDate={currentDate}
          events={events}
          dragOverEvent={dragOverEvent}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          handleDateCellClick={handleDateCellClick}
        />
      </div>
    </div>
  );
};

export default CalendarLayout;