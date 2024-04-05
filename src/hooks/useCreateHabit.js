import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { useState } from "react";
import useHabitStore from "../store/habitStore";

const useCreateHabit = () => {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false)
	const authUser = useAuthStore((state) => state.user);
	const addHabit = useAuthStore((state) => state.addHabit)
	const createHabit = useHabitStore((state) => state.createHabit)

	const handleCreateHabit = async (inputs) => {
		setIsLoading(true)
		if (!inputs.habitName || !inputs.habitDescription || !inputs.habitImageUrl) {
			showToast("Error", "Please make sure all fields are filled in", "error");
			setIsLoading(false)
			return;
		}

		try {
			const newHabit = {
				habitName: inputs.habitName,
				habitDescription: inputs.habitDescription,
				imageUrl: inputs.habitImageUrl,
				createdAt: Date.now(),
				createdBy: authUser.uid
			};

			const habitDocRef = await addDoc(
				collection(firestore, "habits"),
				newHabit
			);
			const userDocRef = doc(firestore, "users", authUser.uid);

			await updateDoc(userDocRef, { habits: arrayUnion(habitDocRef.id) });

			createHabit({ ...newHabit, id: habitDocRef.id });
			addHabit({ ...newHabit, id: habitDocRef.id });

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false)
		}
	};
	return { handleCreateHabit,isLoading };
};

export default useCreateHabit;
