import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Tick from "./icons/Tick";
import Cross from "./icons/Cross";
import useSubmitDates from "../hooks/useSubmitDates";
import {Button} from "@chakra-ui/react"
import useGetHabitDates from "../hooks/useGetHabitDates";

const HabitCalendar = ({ habit }) => {
	const [value, setValue] = useState(null);
	const [dateLogs, setDateLogs] = useState([]);
  const {submitDates, isSubmitting} = useSubmitDates();
  const {dates , isFetching} = useGetHabitDates();

	// Dates from database

  const handleDatesSubmit = async() => {
    await submitDates(dateLogs, habit)
  }

	// Initialize dateLogs state with dates from randomDateLogs
	useEffect(() => {
		setDateLogs(dates);
	}, []);

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}-${month < 10 ? "0" : ""}${month}-${
			day < 10 ? "0" : ""
		}${day}`;
	};

	const handleDateClick = (date) => {
		const formattedDate = formatDate(date);
		const logEntryIndex = dateLogs.findIndex(
			(log) => log.logDate === formattedDate
		);

		// Update dateLogs state
		if (logEntryIndex !== -1) {
			// If the date already exists in dateLogs, toggle its state
			const updatedDateLogs = [...dateLogs];
			updatedDateLogs[logEntryIndex].state =
				dateLogs[logEntryIndex].state === "done" ? "not-done" : "done";
			setDateLogs(updatedDateLogs);
		} else {
			// If the clicked date is not in dateLogs, add it with the new state
			setDateLogs((prevLogs) => [
				...prevLogs,
				{ logDate: formattedDate, state: "done" },
			]);
		}
	};

	const tileIcon = ({ date, view }) => {
		const formattedDate = formatDate(date);
		const logEntry = dateLogs.find((log) => log.logDate === formattedDate);

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
      <Calendar
        value={value}
        locale="en-US"
        onClickDay={handleDateClick}
        tileContent={(props) => tileIcon(props)}
      />
      <Button onClick={()=> handleDatesSubmit()} isLoading={isSubmitting}>Submit</Button>
    </>
	);
};

export default HabitCalendar;
