import React from 'react'
import CalendarLayout from '../../Components/CalendarLayout/CalendarLayout'
import UpcomingEvent from '../../Components/UpcomingEvents'

const Home = () => {
  return (
    <>
      <CalendarLayout />
      <div className='grid grid-cols-3 gap-4  m-4'>
        <UpcomingEvent/>
      </div>
    </>
  )
}

export default Home