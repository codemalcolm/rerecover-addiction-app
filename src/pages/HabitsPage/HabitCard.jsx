import { Box, Button, Flex, Image, Input, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
import { QuerySnapshot, arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useHabitStore from "../../store/habitStore";
import useEditHabit from "../../hooks/useEditHabit";
import HabitCalendar from "../../components/HabitCalendar";


const HabitCard = ({ habit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [isEmojiPicked, setIsEmojiPicked] = useState(false);
	const [emojiImageUrl, setEmojiImageUrl, ] = useState("");
	const [ isDeleting , setIsDeleting ] = useState(false)

	const deleteHabit = useHabitStore((state) => state.deleteHabit)
	const setCurrentHabit = useHabitStore(state => state.setCurrentHabit);
	const authUser = useAuthStore((state) => state.user);

	const [isEditOn , setIsEditOn] = useState(false)

	const {editHabit, isEditting } = useEditHabit();
	const showToast = useShowToast();
	// const {handleCreateHabit, isLoading} = useCreateHabit();
	// const { isFetching, habits } = useGetUserHabits();

	const [inputs, setInputs] = useState({
		habitName:"",
		habitDescription:"",
		habitImageUrl:""
	})

	const handleEmojiPick = (e) => {
		let url = e.imageUrl

		setIsEmojiPicked(true);

		setIsPickerOpen(!isPickerOpen)

		setInputs({ ...inputs, habitImageUrl: url })
	};

	const handleDeleteHabit = async() => {
		if(!window.confirm("Are you sure you want to delete this habit ?")) return
		if (isDeleting) return

		try {

			const dateQ = query(
				collection(firestore, "date-logs"),
				where("habitId", "==", habit.id)
			)
			
			const dateQuerySnapshot = await getDocs(dateQ)
			
			for (const document of dateQuerySnapshot.docs) {
				const docRef = doc(firestore, "date-logs", document.id);
				await deleteDoc(docRef);
			}

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

	const handleEditHabit = async() => {
		try {
			await editHabit(inputs, habit)
			setInputs({
				habitName:"",
				habitDescription:"",
				habitImageUrl:""
			})

			onClose();
		} catch (error) {
			showToast("Error", `${error.message}`, "error");
		}
	}

	useEffect(()=>{
		setIsEmojiPicked(false)
		setIsEditOn(false)
		setInputs({
		habitName:"",
		habitDescription:"",
		habitImageUrl:""})
	} ,[isOpen, onClose])

	const handleSetCurrentHabit = (habit) =>{
		setCurrentHabit(habit)
	}

	return (
		<>
			<Box
				border={"3px solid black"}
				width={270}
				height={350}
				rounded={"18px"}
				px={8}
                onClick={()=>{
					onOpen()
					handleSetCurrentHabit(habit)
					}}
                cursor={"pointer"}
				mt={50}
			>
				<Flex
					position={"relative"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Flex
						border={"3px solid black"}
						width={"112px"}
						height={"112px"}
						rounded={"full"}
						justifyContent={"center"}
						alignItems={"center"}
						position={"absolute"}
						bg={"white"}
						cursor={"pointer"}
					>
					{/* TODO update emoji state*/}
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
				{isPickerOpen ? setIsPickerOpen(false) : isPickerOpen}
				}} size={"md"}>
				<ModalOverlay />

				<ModalContent 
				rounded={"18px"}
				border={"2.5px solid black"}
				maxHeight={770}
				userSelect={"none"}>

					<Flex
						position={"relative"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<Flex
							border={"3px solid black"}
							width={"112px"}
							height={"112px"}
							onClick={isEditOn ? () => setIsPickerOpen(!isPickerOpen) : null}
							rounded={"full"}
							justifyContent={"center"}
							alignItems={"center"}
							position={"absolute"}
							bg={"white"}
							cursor={isEditOn ? "pointer" : "normal"}
						>
							<EmojiImage
								imgURL={
									isEmojiPicked ? inputs.habitImageUrl : habit.imageUrl
								}
							/>
						</Flex>
						<Flex position={"fixed"} top={{base:"15%", md:"15%"}} left={{base:"5%", md:"38.75%"}} zIndex={9999}>
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
							<Box _hover={{color:"green"}} cursor={"pointer"}
							color={isEditOn ? "green" : "black"}
							onClick={() => {setIsEditOn(!isEditOn)
							setIsPickerOpen(false)}}>
								<FaPen style={{
										width: "20px",
										height:"20px"
									}}
								/>
							</Box>
					</Flex>

					<ModalBody display={"flex"} justifyContent={"center"}>
						<Flex width={"280"} flexDirection={"column"} gap={4}>
						{isEditOn 
						? 
						<>
							<Input
								value={inputs.habitName || habit.habitName }
								onChange={(e) => setInputs({ ...inputs, habitName: e.target.value })}
								isReadOnly={!isEditOn}
							/>
							<Textarea
								value={inputs.habitDescription || habit.habitDescription }
								onChange={(e) =>setInputs({ ...inputs, habitDescription: e.target.value})}
								isReadOnly={!isEditOn}
								maxHeight={190}
							/>
						</>
						:
						<>
							<Text fontSize={"32px"} textAlign={"center"}>{habit.habitName}</Text>
							<Text fontSize={"20px"} textAlign={"center"}>{habit.habitDescription}</Text>
						</>
						}
						<HabitCalendar habit={habit} isEditOn={isEditOn}/>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3}
						onClick={() => {
							onClose()
							handleEditHabit()
							}}>
							{isEditOn ? "Save Changes" : "Done"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default HabitCard;
