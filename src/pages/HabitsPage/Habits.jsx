import { Button, Flex, Input, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
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
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system'



const Habits = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
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

			<Modal isOpen={isOpen} onClose={onClose} size={"md"}>
				<ModalOverlay />
				<ModalContent>
                <Flex position={"relative"} justifyContent={"center"} alignItems={"center"}>
                    <Flex border={"2px solid black"} width={"112px"} height={"112px"}
                        rounded={"full"} justifyContent={"center"} alignItems={"center"} position={"absolute"} bg={"white"} cursor={"pointer"}>
                            <SlPicture style={{
                                width:"50px",
                                height:"50px"
                            }}/>
                    </Flex>
                </Flex>
					
					<ModalHeader>Create a habit</ModalHeader>
					<ModalCloseButton />
					<ModalBody display={"flex"} justifyContent={"center"}>
						<Flex width={"250px"} flexDirection={"column"} gap={4}>
							<Input placeholder="Enter the name of your habit"></Input>
							<Textarea placeholder='Enter the description of your habit max. 40 characters' />
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Habits;
