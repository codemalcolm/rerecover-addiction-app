import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Tick from "./icons/Tick";
import Cross from "./icons/Cross";
import useSubmitDates from "../hooks/useSubmitDates";
import { Button, Skeleton } from "@chakra-ui/react";
import useGetHabitDates from "../hooks/useGetHabitDates";

const HabitCalendar = ({ habit }) => {
  const [value, setValue] = useState(null);
  const [dateLogs, setDateLogs] = useState([]);
  const [areDatesFetched, setAreDatesFetched] = useState(false);
  const { submitDates, isSubmitting } = useSubmitDates();
  // custom hook for fetching
  const { dates, isFetching } = useGetHabitDates();

  // submitting new or updated logs
  const handleDatesSubmit = async () => {
    await submitDates(dateLogs, habit);
  };

  // loading tick and cross icons
  useEffect(() => {
    if (!isFetching) {
      setDateLogs(dates);
      setAreDatesFetched(true);
    }
  }, [isFetching, dates]);

  // formating date into YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
  };

  // get currently clicked date
  const handleDateClick = (date) => {
    const formattedDate = formatDate(date);
    const logEntryIndex = dateLogs.findIndex(
      (log) => log.logDate === formattedDate
    );

    // Update dateLogs state
    if (logEntryIndex !== -1) {
      // If the date exists in dateLogs, change state
      const updatedDateLogs = [...dateLogs];
      updatedDateLogs[logEntryIndex].state =
        dateLogs[logEntryIndex].state === "done" ? "not-done" : "done";
      setDateLogs(updatedDateLogs);
    } else {
      // Add log it with clicked date and new state
      setDateLogs((prevLogs) => [
        ...prevLogs,
        { logDate: formattedDate, state: "done" },
      ]);
    }
  };

  // Fill date contents logic
  const tileIcon = ({ date, view }) => {
    const formattedDate = formatDate(date);
    const logEntry = dateLogs.find((log) => log.logDate === formattedDate);
    // if the view is month render ticks and crosses if it is not render nothing
    if (view === "month") {
      if (logEntry) {
        return (
          <div style={{ position: "relative" }}>
            {logEntry.state === "done" ? <Tick /> : <Cross />}
          </div>
        );
      } else {
        return null;
      }
    }
  };

  return (
    <>
      {areDatesFetched || isFetching ? (
        <>
          <Calendar
            value={value}
            locale="en-US"
            onClickDay={handleDateClick}
            tileContent={(props) => tileIcon(props)}
          />
        </>
      ) : (
        <Skeleton height="500px" width="100%">
          <div>Contents wrapped</div>
          <div>Wont be visible</div>
        </Skeleton>
      )}
      <Button onClick={() => handleDatesSubmit()} isLoading={isSubmitting}>
        Submit
      </Button>
    </>
  );
};

export default HabitCalendar;
