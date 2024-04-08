import {
	Box,
	Button,
	Flex,
	Input,
	Skeleton,
	Textarea,
	Tooltip,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { SlPicture } from "react-icons/sl";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import {
	createMultiStyleConfigHelpers,
	defineStyle,
} from "@chakra-ui/styled-system";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import EmojiImage from "./EmojiImage";
import useCreateHabit from "../../hooks/useCreateHabit";
import HabitCard from "./HabitCard";
import useGetUserHabits from "../../hooks/useGetUserHabits";

const Habits = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [isEmojiPicked, setIsEmojiPicked] = useState(false);
	const [emojiImageUrl, setEmojiImageUrl, ] = useState("");
	const {handleCreateHabit, isLoading} = useCreateHabit();
	const { isFetching, habits } = useGetUserHabits();

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

	useEffect(()=>{
		setIsEmojiPicked(false)
		setInputs({
		habitName:"",
		habitDescription:"",
		habitImageUrl:""})
	} ,[isOpen])
	
	return (
		<>
			<Flex justifyContent={"end"} mt={5}>
				<Tooltip
					hasArrow
					label="Create a habit"
					rounded={"4px"}
					bg="#e2e8f0"
					color="black"
					shadow={"none"}
				>
					<Button rounded={"full"} w={50} h={50} onClick={onOpen}>
						<FaPlus
							style={{
								width: "35px",
								height: "35px",
							}}
						/>
					</Button>
				</Tooltip>
			</Flex>
			{/* Create Habit Modal */}
			<Modal isOpen={isOpen} onClose={onClose} size={"md"}>
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
							{!isEmojiPicked ? (
								<SlPicture
									style={{
										width: "50px",
										height: "50px",
									}}
								/>
							) : (
								<EmojiImage
									imgURL={
										emojiImageUrl
									}
								/>
							)}
						</Flex>
						<Flex position={"fixed"} top={"18%"} left={"7%"} zIndex={9999}>
							<EmojiPicker
								open={isPickerOpen}
								onEmojiClick={(e) => handleEmojiPick(e)}
								position={"absolute"}
							/>
						</Flex>
					</Flex>

					<ModalHeader>Create a habit</ModalHeader>
					<ModalCloseButton />
					<ModalBody display={"flex"} justifyContent={"center"}>
						<Flex width={"250px"} flexDirection={"column"} gap={4}>
							<Input placeholder="Enter the name of your habit"
								value={inputs.habitName}
								onChange={(e) => setInputs({ ...inputs, habitName: e.target.value })}
							/>
							<Textarea placeholder="Enter the description of your habit max. 40 characters"
								value={inputs.habitDescription}
								onChange={(e) =>setInputs({ ...inputs, habitDescription: e.target.value })}
							/>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={() => {
							handleCreateHabit(inputs)
							onClose()}}
							isLoading={isLoading}>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Flex gap={3} >
				{isFetching &&
					[0, 1, 2].map((_, idx) => (
						<VStack key={idx} alignItems={"flex-start"} gap={3}>
							<Skeleton w={"270px"}>
								<Box h="300px">Contents wrapped</Box>
							</Skeleton>
						</VStack>
					))
				}
					{!isFetching && (
						<>
						{habits.map((habit) => (
							<HabitCard habit={habit} key={habit.id}/>
						))}
						</>
					)}
			</Flex>
		</>
	);
};

export default Habits;
