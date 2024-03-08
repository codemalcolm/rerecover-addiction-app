import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { GrDocumentMissing } from "react-icons/gr";

const CreateHabitBtn = () => {
	return (
		<div className="border-2 border-gray-500 rounded">
			<div className="flex-row justify-center text-center py-8">
				<p className="text-xl">You haven't added any habit yet</p>
                <GrDocumentMissing className="text-[175px]"/>
				<p className="">How about we change that ?</p>
			</div>
		</div>
	);
};

export default CreateHabitBtn;
