import { Button, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
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

			<Modal isOpen={isOpen} onClose={onClose}>
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
					
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						sfnbaijnakjsbfijhasbfba skjhfbakjsnbfjklasnf fasjhvfhasbfkjbashb
						fhasbfhabfhabsfkjajsf as fasfbvashbfhjkabfhabsfjbashfbahsbfjhaqbs
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
