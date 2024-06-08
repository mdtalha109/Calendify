import React from 'react';
import { FaAlignRight, FaAngleLeft, FaAngleRight, FaArrowRight, FaBeer } from "react-icons/fa";

const CalendarHeader = ({
  currentDate,
  handleOpenEventForm,
  handleOpenRecurringEventForm,
  onPrevMonth,
  onNextMonth,
  onSelectMonth,
}) => {
  const monthYearString = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    const newDate = new Date(currentDate.getFullYear(), months.indexOf(selectedMonth), 1);
    onSelectMonth(newDate);
  };

  return (
    <header className="flex items-center justify-between mb-8">


      <div className='flex items-center'>
        <div className='text-2xl font-bold mr-4'>{monthYearString}</div>
      </div>

      <div className='flex gap-2'>
        <button onClick={onPrevMonth}><FaAngleLeft/></button>
        <select
          value={currentDate.toLocaleString('default', { month: 'long' })}
          onChange={handleMonthChange}
          className="border rounded p-1"
        >
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
        <button onClick={onNextMonth}><FaAngleRight/></button>
      </div>
    </header>
  );
};

export default CalendarHeader;
