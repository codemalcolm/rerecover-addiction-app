import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Tick from "./icons/Tick";
import Cross from "./icons/Cross";

const HabitCalendar = () => {
	const [value, setValue] = useState(null);
	const [dateLogs, setDateLogs] = useState([]);

	// Dates from database
	const randomDateLogs = [
		{ logDate: "2024-04-10", state: "done" },
		{ logDate: "2024-04-17", state: "not-done" },
		{ logDate: "2024-04-26", state: "done" },
		{ logDate: "2024-04-12", state: "not-done" },
		{ logDate: "2024-04-25", state: "done" },
		{ logDate: "2024-04-29", state: "done" },
		{ logDate: "2024-04-09", state: "not-done" },
		{ logDate: "2024-04-05", state: "done" },
	];

	// Initialize dateLogs state with dates from randomDateLogs
	useEffect(() => {
		setDateLogs(randomDateLogs);
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
		console.log(dateLogs);
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
		<Calendar
			value={value}
			locale="en-US"
			onClickDay={handleDateClick}
			tileContent={(props) => tileIcon(props)}
		/>
	);
};

export default HabitCalendar;
