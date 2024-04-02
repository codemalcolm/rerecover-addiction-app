import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { doc, setDoc } from "firebase/firestore";
const useSignUpWithEmailAndPassword = () => {
	const showToast = useShowToast();
	const [createUserWithEmailAndPassword, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const signup = async (inputs) => {
		if (
			!inputs.email ||
			!inputs.password ||
			!inputs.password ||
			!inputs.confirmPassword
		) {
			showToast("Error", "Please make sure all field are filled in", "error");
			return;
		}
		if (inputs.password !== inputs.confirmPassword) {
			showToast("Error", "Passwords don't match", "error");
			return;
		}
		try {
			const newUser = await createUserWithEmailAndPassword(
				inputs.email,
				inputs.password
			);
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}

			if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					fullName: inputs.fullName,
					profilePicURL: "",
					habits: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
