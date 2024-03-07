import React from "react";

const CreateHabit = () => {
	return (
		<div className="mt-16 border border-slate-400 flex-row items-center w-80 rounded-xl px-8">
			<div className="relative flex justify-center items-center">
				<div className="border border-black text-center w-28 h-28 rounded-full leading-24 absolute bg-white flex items-center p-2">
					Image Picker
				</div>
			</div>
			<div className="w-full m-auto mt-16 text-center">
				<h2 className="font-bold text-xl">Create your habit</h2>
				<input
					type="text"
					className="border-2 border-black rounded px-2 mt-2"
					placeholder="Habit Name"
				/>
				<input
					type="text"
					className="border-2 border-black rounded px-2 py-4 mt-2"
					placeholder="Habit Description"
				/>
				<button className="border-2 border-black mt-2 mb-4 px-8 py-2 rounded-full font-semibold">
					ADD HABIT
				</button>
			</div>
		</div>
	);
};

export default CreateHabit;
