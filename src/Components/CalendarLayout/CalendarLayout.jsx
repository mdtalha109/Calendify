/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarWeekdays from '../CalendarWeekdays/CalendarWeekdays'
import CalendarDates from '../CalendarDates/CalendarDates'
import EventForm from '../EventForm/EventForm'
import RecurringEventForm from '../RecurringEventForm/RecurringEventForm';
import Modal from '../Modal/Modal.jsx';
import { addEvent, editEvent } from '../../features/events/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';

const CalendarLayout = () => {
   const events = useSelector((state) => state.events.events);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEventFormVisible, setEventFormVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [dragOverEvent, setDragOverEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isRecurringEventFormVisible, setRecurringEventFormVisible] = useState(false);

  const dispatch = useDispatch()

  const handleOpenRecurringEventForm = () => {
    setRecurringEventFormVisible(true);
  };

  const handleCloseRecurringEventForm = () => {
    setRecurringEventFormVisible(false);
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateCellClick = (date) => {

    setSelectedDate(date);
    handleOpenEventForm();
  };

  const handleEditEvent = (e, event) => {
    e.stopPropagation()
    setEditingEvent(event);
  };

  // eslint-disable-next-line no-unused-vars
  const getUniqueCategories = () => {
    const uniqueCategories = [...new Set(events.map(event => event.category))];
    return uniqueCategories;
  };

  const handleDeleteEvent = (eventToDelete) => {
    // const updatedEvents = events.filter(event => event !== eventToDelete);
  };

  const handleOpenEventForm = () => {
    setEventFormVisible(true);
  };

  const handleEventSave = (id, title, date, time, category, color) => {
   
    dispatch(editEvent({id, title, date, time, category, color}))
  };

  const handleCloseEventForm = () => {
    setEventFormVisible(false);
  };

  const handleAddEvent = (id, title, date, time, category, color) => {
    
    const newEvent = {
      id,
      title,
      date,
      time,
      category,
      color,
    };

    dispatch(addEvent({...newEvent}));
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

      // setEvents(updatedEvents);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSelectMonth = (date) => {
    setCurrentDate(date);
  };

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);


  useEffect(() => {
    if (isEventFormVisible) {
      setSelectedDate(null);
    }
  }, [isEventFormVisible]);

  return (
    <div className="calendar bg-white dark:bg-gray-800 rounded-lg shadow-lg m-4">
      <CalendarHeader
        currentDate={currentDate}
        handleOpenEventForm={handleOpenEventForm}
        onPrevMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        onNextMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
        onSelectMonth={handleSelectMonth}
        handleOpenRecurringEventForm={handleOpenRecurringEventForm} 
      />

      {/* <div className="filter-section">
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={handleCategoryFilter}>
          <option value="All">All</option>
          {getUniqueCategories().map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div> */}

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
        <Modal>
            <EventForm selectedDate={selectedDate} onClose={handleCloseEventForm} onEventCreate={handleAddEvent} />
        </Modal>
        
      )}

      {editingEvent && (

        <Modal>
            <EventForm 
              selectedDate={null} 
              onClose={() => setEditingEvent(null)}
              onEventCreate={handleEventSave} 
              event={editingEvent}
              />
        </Modal>
      )}

      {isRecurringEventFormVisible && (
        <RecurringEventForm
          onClose={handleCloseRecurringEventForm}
          // onRecurringEventCreate={handleRecurringEventCreate}
        />
      )}
    </div>
  );
};

export default CalendarLayout;