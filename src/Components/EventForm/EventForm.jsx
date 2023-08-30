import React, { useState } from 'react';

const EventForm = ({ selectedDate, onClose, onEventCreate }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(selectedDate);
  const [time, setTime] = useState('');

  console.log('date: ', date)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date && time) {
      // Call the onEventCreate function to create the event

      onEventCreate(title, date, time);
      // Clear form inputs
      setTitle('');
      setDate('');
      setTime('');
      onClose();
    }
  };

  return (
    <div className="event-form">
      <h3>Create New Event</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">Create Event</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EventForm;
