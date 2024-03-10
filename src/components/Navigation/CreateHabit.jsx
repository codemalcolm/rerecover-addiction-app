import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

const CreateHabit = () => {
	return (
		<div className="mt-16 border-2 border-black flex-row items-center w-[290px] h-[350px] rounded-xl px-8 m-auto">
			<div className="relative flex justify-center items-center">
				<div className="border-2 border-black w-28 h-28 rounded-full absolute bg-white flex items-center justify-center p-2 cursor-pointer">
					<AddPhotoAlternateRoundedIcon
						sx={{
							width: 40,
							height: 40,
						}}
					/>
				</div>
			</div>
			<div className="mt-16 text-center">
				<h2 className="font-bold text-2xl">Create your habit</h2>
				<input
					type="text"
					className="border-2 border-black rounded px-2 mt-6 w-full"
					placeholder="Habit Name"
				/>
				<input
					type="text"
					className="border-2 border-black rounded px-2 py-4 mt-6 w-full"
					placeholder="Habit Description"
				/>
				<button className="border-2 border-black mt-6 mb-4 px-8 py-2 rounded-full font-semibold">
					ADD HABIT
				</button>
			</div>
		</div>
	);
};

export default CreateHabit;
