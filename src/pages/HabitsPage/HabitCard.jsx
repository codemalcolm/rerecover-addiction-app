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

const HabitCard = ({ habit }) => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
	// const [isPickerOpen, setIsPickerOpen] = useState(false);
	// const [isEmojiPicked, setIsEmojiPicked] = useState(false);
	// const [emojiImageUrl, setEmojiImageUrl, ] = useState("");
	// const {handleCreateHabit, isLoading} = useCreateHabit();
	// const { isFetching, habits } = useGetUserHabits();

	// const [inputs, setInputs] = useState({
	// 	habitName:"",
	// 	habitDescription:"",
	// 	habitImageUrl:""
	// })

	// const handleEmojiPick = (e) => {
	// 	setIsEmojiPicked(true);
	// 	let url = e.imageUrl
	// 	setIsPickerOpen(!isPickerOpen)
	// 	setEmojiImageUrl(url);
	// 	setInputs({ ...inputs, habitImageUrl: url })
	// };

	return (
		<>
			<Box
				border={"2px solid black"}
				width={270}
				height={350}
				rounded={"18px"}
				px={8}
                onClick={() => console.log("clicked")}
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
{/* 
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
							onClose()}}
							isLoading={isLoading}>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> */}
		</>
	);
};

export default HabitCard;
