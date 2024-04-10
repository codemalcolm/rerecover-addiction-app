import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tick from './icons/Tick';
import Cross from './icons/Cross';


const HabitCalendar = () => {
    const [value, setValue] = useState(null);
    const [clickedDates, setClickedDates] = useState({});
    const [dateLogs, setDateLogs] = useState({
      logDate:"",
      state:""
    })



    const handleDateClick = (date) => {
        const formattedDate = date.toISOString().split('T')[0]
        console.log(formattedDate + "here")
        if (formattedDate) {
          if (clickedDates[formattedDate]) {
            setDateLogs(prevLogs => ({ ...prevLogs, logDate: formattedDate, state: "done" }));
          } else if (clickedDates.hasOwnProperty(formattedDate) && !clickedDates[formattedDate]) {
            setDateLogs(prevLogs => ({ ...prevLogs, logDate: formattedDate, state: "not-done" }));
          } else {
            setDateLogs(prevLogs => ({ ...prevLogs, logDate: formattedDate, state: "" }));
          }
        }

        setClickedDates(prevDates => ({
          ...prevDates,
          [formattedDate] : !prevDates[formattedDate]
        }));
        console.log(dateLogs)
    }

    const tileIcon = ({ date, view }) => {
        const formattedDate = date.toISOString().split('T')[0];
        if (view === 'month' && clickedDates[formattedDate]) {

            return <div style={{position:"relative"}}><Tick/></div>

          } else if (view === "month" && clickedDates.hasOwnProperty(formattedDate) && !clickedDates[formattedDate]){

            return <div style={{position:"relative"}}><Cross/></div>

          } else if (view === 'month' && !clickedDates.hasOwnProperty(formattedDate)){
            return null;
          }
    }

  return (
    <>
        <Calendar value={value} onClickDay={(e)=> handleDateClick(e)} tileContent={tileIcon}/>
    </>
  )
}

export default HabitCalendar