import {
	Box,
	Button,
	Flex,
	Image,
	Input,
	Skeleton,
	Text,
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
import searchingImage from "../../images/searching.svg";
import "../../../fonts.css";

const Habits = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [isEmojiPicked, setIsEmojiPicked] = useState(false);
	const [emojiImageUrl, setEmojiImageUrl] = useState("");
	const { handleCreateHabit, isLoading } = useCreateHabit();
	const { isFetching, habits } = useGetUserHabits();

	const [inputs, setInputs] = useState({
		habitName: "",
		habitDescription: "",
		habitImageUrl: "",
	});

	const handleEmojiPick = (e) => {
		setIsEmojiPicked(true);
		let url = e.imageUrl;
		setIsPickerOpen(!isPickerOpen);
		setEmojiImageUrl(url);
		setInputs({ ...inputs, habitImageUrl: url });
	};

	useEffect(() => {
		setIsEmojiPicked(false);
		setInputs({
			habitName: "",
			habitDescription: "",
			habitImageUrl: "",
		});
	}, [isOpen]);

	return (
		<>
			<Flex justifyContent={"end"} mt={5}>
				{habits.length !== 0 && (
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
				)}
			</Flex>
			{/* Create Habit Modal */}
			<Modal isOpen={isOpen}
			onClose={() => {onClose(); setIsPickerOpen(false);
			}} size={"md"} >
				<ModalOverlay />
				<ModalContent minHeight={500} maxWidth={370}
				border={"3px solid black"}>
					<Flex
						position={"relative"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<Flex
							border={"3px solid black"}
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
								<EmojiImage imgURL={emojiImageUrl} />
							)}
						</Flex>
						<Flex position={"fixed"} top={{base:"15%", md:"15%"}} left={{base:"5%", md:"38.75%"}} zIndex={9999}>
							<EmojiPicker
								open={isPickerOpen}
								onEmojiClick={(e) => handleEmojiPick(e)}
								position={"absolute"}
							/>
						</Flex>
					</Flex>

					<ModalCloseButton />
					<ModalBody display={"flex"} justifyContent={"center"}>
						<Flex width={"250px"} flexDirection={"column"} gap={4}>
							<Text mt={"58px"} 
							textAlign={"center"}
							fontSize={"22px"}
							fontWeight={500}
							>
								Create a Habit
							</Text>
							<Input
								placeholder="Enter the name of your habit"
								value={inputs.habitName}
								onChange={(e) =>
									setInputs({ ...inputs, habitName: e.target.value })
								}
							/>
							<Textarea
								placeholder="Enter the description of your habit max. 40 characters"
								value={inputs.habitDescription}
								onChange={(e) =>
									setInputs({ ...inputs, habitDescription: e.target.value })
								}
								maxHeight={190}
							/>
						</Flex>
					</ModalBody>

					<ModalFooter display={"flex"} justifyContent={"center"}>
						<Button
							colorScheme="blue"
							onClick={() => {
								handleCreateHabit(inputs);
								onClose();
							}}
							isLoading={isLoading}
						>
							Create Habit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Flex
				gap={3}
				flexWrap={"wrap"}
				justifyContent={{
					base: "center",
					md: habits.length > 0 ? "start" : "center",
				}}
			>
				{isFetching && 
					Array.from({ length: habits.length }).map((_, idx) => (
						<VStack key={idx} alignItems={"flex-start"} gap={3}>
							<Skeleton w={"270px"}>
								<Box h="300px">Contents wrapped</Box>
							</Skeleton>
						</VStack>
					))}
				{isFetching || habits.length > 0 ? (
					<>
						{habits.map((habit) => (
							<HabitCard habit={habit} key={habit.id} />
						))}
					</>
				) : (
					<>
					{/* No habits card */}
						<Flex
							width={"750px"}
							borderRadius={"16px"}
							justifyContent={"center"}
							flexDirection={{ base: "column", md: "row" }}
							bgGradient="linear(to-l, gray.50, gray.200, gray.100, gray.200 ,gray.50)"
						>
							<Image
								src={searchingImage}
								width={{ base: "full", md: "350px" }}
								height={{ base: "300px", md: "350px" }}
							/>
							<Flex
								flexDirection={{ base: "row", md: "column" }}
								mb={{ base: "30px", md: "100px" }}
								alignItems={{ base: "end", md: "stretch" }}
								justifyContent={"center"}
							>
								<Box display={{base:"flex", md:"block"}} flexDirection={{base:"column", md:"none"}} alignItems={{base:"center", md:"none"}}>
									<Text
										width={{base:"150px", md:"250px"}}
										fontSize={{base:"20px",md:"28px"}}
										textAlign={{base:"center", md:"start"}}
										fontFamily={"Merriweather Sans"}
										my={{base:"0px", md:"auto"}}
										mb={{base:"0px", md:"16px"}}
										style={{
											"word-spacing": "2px",
										}}
									>
										THERE ARE NO <span style={{ color: "#4fb9dd" }}>HABITS</span>{" "}
										CREATED YET
									</Text>
									<Button
										borderRadius={"32px"}
										border={"1px solid black"}
										onClick={onOpen}
										mt={{base:"16px", md:"0px"}}
									>
										Create your first Habit
									</Button>
								</Box>
							</Flex>
						</Flex>
					</>
				)}
			</Flex>
		</>
	);
};

export default Habits;
