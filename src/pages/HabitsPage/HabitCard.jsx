import { Box, Button, Flex, Image, Input, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import EmojiImage from "./EmojiImage";
import { SlPicture } from "react-icons/sl";
import useGetUserHabits from "../../hooks/useGetUserHabits";
import useCreateHabit from "../../hooks/useCreateHabit";
import EmojiPicker from "emoji-picker-react";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { auth, firestore } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useHabitStore from "../../store/habitStore";


const HabitCard = ({ habit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [isEmojiPicked, setIsEmojiPicked] = useState(false);
	const [emojiImageUrl, setEmojiImageUrl, ] = useState("");
	const [ isDeleting , setIsDeleting ] = useState(false)
	const deleteHabit = useHabitStore((state) => state.deleteHabit)

	const authUser = useAuthStore((state) => state.user);

	const showToast = useShowToast();
	// const {handleCreateHabit, isLoading} = useCreateHabit();
	// const { isFetching, habits } = useGetUserHabits();

	const [inputs, setInputs] = useState({
		habitName:"",
		habitDescription:"",
		habitImageUrl:""
	})

	const handleEmojiPick = (e) => {
		setIsEmojiPicked(true);
		let url = e.imageUrl
		setIsPickerOpen(!isPickerOpen)
		setEmojiImageUrl(url);
		setInputs({ ...inputs, habitImageUrl: url })
	};

	const handleDeleteHabit = async() => {
		if(!window.confirm("Are you sure you want to delete this post ?")) return
		if (isDeleting) return

		try {

			const userRef = doc(firestore, "users", authUser.uid)
			await deleteDoc(doc(firestore, "habits", habit.id))

			await updateDoc(userRef, {
				habits: arrayRemove(habit.id)
			})

			
            deleteHabit(habit.id)

            showToast("Success", "Habit deleted successfully", "success")
		} catch (error) {
			showToast("Error", error.message, "error");
		}finally{
			setIsDeleting(false)
		}
	}

	return (
		<>
			<Box
				border={"2px solid black"}
				width={270}
				height={350}
				rounded={"18px"}
				px={8}
                onClick={onOpen}
                cursor={"pointer"}
			>
				<Flex
					position={"relative"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Flex
						border={"2px solid black"}
						width={"112px"}
						height={"112px"}
						rounded={"full"}
						justifyContent={"center"}
						alignItems={"center"}
						position={"absolute"}
						bg={"white"}
						cursor={"pointer"}
					>
						<Image src={habit.imageUrl} />
					</Flex>
				</Flex>
				<Flex mt={16} alignItems={"center"} flexDirection={"column"}>
					<Text fontSize={24}>{habit.habitName}</Text>
					<Text fontSize={16} textAlign={"center"} mt={8}>
						{habit.habitDescription}
					</Text>
				</Flex>
			</Box>

            <Modal isOpen={isOpen} onClose={() => {
				onClose()
				isPickerOpen ? setIsPickerOpen(!isPickerOpen) : isPickerOpen
				}} size={"md"}>
				<ModalOverlay />

				<ModalContent>

					<Flex
						position={"relative"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<Flex
							border={"2px solid black"}
							width={"112px"}
							height={"112px"}
							onClick={() => setIsPickerOpen(!isPickerOpen)}
							rounded={"full"}
							justifyContent={"center"}
							alignItems={"center"}
							position={"absolute"}
							bg={"white"}
							cursor={"pointer"}
						>
							{<EmojiImage
									imgURL={
										habit.imageUrl
									}
								/>
							}
						</Flex>
						<Flex position={"fixed"} top={"18%"} left={"7%"} zIndex={9999}>
							<EmojiPicker
								position={"absolute"}
								open={isPickerOpen}
								onEmojiClick={(e) => handleEmojiPick(e)}
							/>
						</Flex>
					</Flex>

					<Flex justifyContent={"space-between"} alignItems={"center"} p={5}>
							<Box _hover={{color:"red"}} cursor={"pointer"}
							onClick={() => handleDeleteHabit()}
							>
								<MdDelete style={{
									width: "25px",
									height:"25px"
								}}/>
							</Box>

						<FaPen style={{
								width: "20px",
								height:"20px"
							}}/>
					</Flex>
					{/* <ModalCloseButton /> */}
					<ModalHeader>Create a habit</ModalHeader>
					
					<ModalBody display={"flex"} justifyContent={"center"}>
						<Flex width={"250px"} flexDirection={"column"} gap={4}>
							<Input placeholder={habit.habitName}
								value={inputs.habitName}
								onChange={(e) => setInputs({ ...inputs, habitName: e.target.value })}
							/>
							<Textarea placeholder={habit.habitDescription}
								value={inputs.habitDescription}
								onChange={(e) =>setInputs({ ...inputs, habitDescription: e.target.value })}
							/>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3}
						onClick={() => {
							onClose()
							isPickerOpen ? setIsPickerOpen(!isPickerOpen) : isPickerOpen
							}}>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default HabitCard;
