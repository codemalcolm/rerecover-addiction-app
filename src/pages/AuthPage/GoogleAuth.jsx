import { Flex, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ isLogin }) => {
    const [signInWithGoogle, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login)

    const handleGoogleAuth = async () =>{
        try {
            const newUser = await signInWithGoogle()
            if(!newUser && error) {
                showToast("Error", error.message , "error")
                return
            }

            if(newUser){
                const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					fullName: newUser.user.displayName,
					profilePicURL: newUser.user.photoURL,
					habits: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc)
            }
        } catch (error) {
            showToast("Error", error.message , "error")
        }
    }
	return (
		<>
			<Flex alignItems={"center"} gap={5} cursor={"pointer"} color={"#5592db"} _hover={{color:"#9cdcfe"}} onClick={handleGoogleAuth}>
				<FcGoogle
					style={{
						color: "black",
						width: "30px",
						height: "30px",
					}}
				/>
				<Text fontSize={{base:"16px", xl:"18px"}}>{isLogin ? "Login" : "Sign up"} with Google</Text>
			</Flex>
		</>
	);
};

export default GoogleAuth;
