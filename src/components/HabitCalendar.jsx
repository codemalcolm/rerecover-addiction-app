import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Tick from "./icons/Tick";
import Cross from "./icons/Cross";
import useSubmitDates from "../hooks/useSubmitDates";
import { Button, Flex, Skeleton } from "@chakra-ui/react";
import useGetHabitDates from "../hooks/useGetHabitDates";
import "react-calendar/dist/Calendar.css";
import "../../custom-calendar.css";

const HabitCalendar = ({ habit, isEditOn }) => {
	const [value, setValue] = useState(null);
	const [dateLogs, setDateLogs] = useState([]);
	const [areDatesFetched, setAreDatesFetched] = useState(false);
	const { submitDates, isSubmitting } = useSubmitDates();
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

	// function to recognise future dates
	const isFutureDate = (date) => {
		const today = new Date();
		return date > today;
	};

	return (
		<Flex flexDirection={"column"} alignItems={"center"} gap={4}>
			{areDatesFetched || isFetching ? (
				<Flex cursor={!isEditOn ? "not-allowed" : ""}>
					<Calendar
						value={value}
						locale="en-US"
						onClickDay={handleDateClick}
						tileContent={(props) => tileIcon(props)}
						tileDisabled={isEditOn ? ({ date }) => isFutureDate(date) : ""}
						className={
							!isEditOn ? "custom-calendar disabled" : "custom-calendar"
						}
					/>
				</Flex>
			) : (
				<Skeleton height="500px" width="100%">
					<div>Contents wrapped</div>
					<div>Wont be visible</div>
				</Skeleton>
			)}
			<Button
				width={150}
				onClick={() => handleDatesSubmit()}
				isLoading={isSubmitting}
				textAlign={"center"}
				display={isEditOn ? "flex" : "none"}
        justifyContent="center"
        alignItems="center"
			>
				Confirm Dates
			</Button>
		</Flex>
	);
};

export default HabitCalendar;
