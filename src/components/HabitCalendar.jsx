import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const HabitCalendar = () => {
    const [value, setValue] = useState(null);
    const [clickedDate, setClickedDate] = useState(null);


    const handleDateClick = (date) => {
        const dateClicked = date
        const dateInMili = dateClicked.getTime()
        setClickedDate(date);
    }

    const tileIcon = ({ date, view }) => {
        if (view === 'month' && date.getDate() === clickedDate?.getDate()) {
            // Render an icon for the clicked date
            return <div>HERE !</div>
          }
          return null;
    }

  return (
    <>
        <Calendar value={value} onClickDay={(e)=>handleDateClick(e)} tileContent={tileIcon}/>
    </>
  )
}

export default HabitCalendar