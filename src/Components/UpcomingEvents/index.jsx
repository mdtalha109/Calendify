/* eslint-disable no-unused-vars */
import React from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { formatDateTime } from '../../utils/time';
import { deleteEvent } from '../../features/events/eventsSlice';

const UpcomingEvent = () => {
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" data-id="30">
      <div className="flex items-center justify-between mb-4" data-id="31">
        <div className="text-2xl font-bold" data-id="32">Upcoming Events</div>
      </div>

      <div className="flex flex-col gap-4">
        {events?.map((event) => (
          <div className="space-y-4" data-id="35" key={event.id}>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4" data-id="36">
              <div className="flex items-center justify-between" data-id="37">
                <div data-id="38">
                  <div className="font-medium" data-id="39">{event.title}</div>
                  <div className="text-gray-500 dark:text-gray-400" data-id="40">{formatDateTime(event.date)}</div>
                  <div className="text-gray-500 dark:text-gray-400" data-id="40">{event.time}</div>
                </div>
                <div className="flex items-center gap-2" data-id="41">
                  {/* <FaEdit /> */}
                  <FaTrash onClick={() => handleDeleteEvent(event.id)} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
