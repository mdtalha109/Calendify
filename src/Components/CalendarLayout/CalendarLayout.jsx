// CalendarLayout.js
import React, { useState, useEffect } from 'react';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarWeekdays from '../CalendarWeekdays/CalendarWeekdays'
import CalendarDates from '../CalendarDates/CalendarDates'
import EventForm from '../EventForm/EventForm'
import EventEditForm from '../EventEditForm/EventEditForm'

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

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter(event => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  const handleOpenEventForm = () => {
    setEventFormVisible(true);
  };

  const handleEventSave = (updatedEvent) => {
    const updatedEvents = events.map(event =>
      event === editingEvent ? updatedEvent : event 
    );
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const handleCloseEventForm = () => {
    setEventFormVisible(false);
  };

  const addEvent = (title, date, time) => {
    const newEvent = {
      title,
      date,
      time,
    };
    setEvents([...events, newEvent]);
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

  useEffect(() => {
    if (isEventFormVisible) {
      setSelectedDate(null);
    }
  }, [isEventFormVisible]);

  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        handleOpenEventForm={handleOpenEventForm}
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
          handleEditEvent={handleEditEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
      {isEventFormVisible && (
        <EventForm selectedDate={selectedDate} onClose={handleCloseEventForm} onEventCreate={addEvent} />
      )}

      {editingEvent && (
        <EventEditForm
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={handleEventSave}
          
        />
      )}
    </div>
  );
};

export default CalendarLayout;