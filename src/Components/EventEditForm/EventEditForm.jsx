import React, { useState, useEffect } from 'react';

const EventEditForm = ({ event, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setTitle(event.title);
    setDate(event.date);
    setTime(event.time);
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date && time) {
      onSave({ ...event, title, date, time });
      onClose();
    }
  };

  return (
    <div className="event-form">
      <h3>Edit Event</h3>
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
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EventEditForm;
