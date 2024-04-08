import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useHabitStore from "../store/habitStore";
import { firestore } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
const useEditHabit = () => {
	const [isEditting, setIsEditting] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const setHabit = useHabitStore((state) => state.setHabit);
	const showToast = useShowToast();

	const editHabit = async (inputs, habit) => {
		if (isEditting || !authUser) return;

		setIsEditting(true);
		const habitId = habit.id;
		const habitRef = doc(firestore, `habits/${habitId}`);

		try {
			const editedHabit = {
				...habit,
				habitName: inputs.habitName || habit.habitName,
				habitDescription: inputs.habitDescription || habit.habitDescription,
				imageUrl: inputs.habitImageUrl || habit.imageUrl,
			};

			await updateDoc(habitRef, editedHabit);
			setHabit(editedHabit);
			showToast("Success", "Habit updated successfully", "success");
			
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsEditting(false);
		}
	};
	return { editHabit, isEditting };
};

export default useEditHabit;
