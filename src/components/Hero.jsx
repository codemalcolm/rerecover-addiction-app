import React from "react";
import CreateHabit from "./Navigation/CreateHabit";
import CreateHabitBtn from "./Navigation/CreateHabitBtn";

const Hero = () => {
	return (
		<div className="mx-6 mt-4 flex justify-center">
			<CreateHabit />
			<CreateHabitBtn />
		</div>
	);
};

export default Hero;
