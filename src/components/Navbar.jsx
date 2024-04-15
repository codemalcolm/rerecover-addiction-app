import {
	Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthStore from "../store/authStore";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import "../../fonts.css";
import React from "react";
const Navbar = () => {
	const btnRef = React.useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleLogout, isLoggingOut, error } = useLogout();
	const authUser = useAuthStore((state) => state.user);
	return (
		<Flex
			border={"1px solid black"}
			justifyContent={"space-between"}
			alignItems={"center"}
			pl={5}
			pr={8}
			py={5}
		>
			<Box
				textAlign={"center"}
				fontSize={36}
				fontFamily={"Eczar"}
				fontWeight={700}
			>
				ReRecover
			</Box>
			<Flex
				justifyContent={"center"}
				alignItems={"center"}
				gap={5}
				fontSize={22}
				display={{ base: "none", md: "flex" }}
				fontFamily={"Kanit"}
				fontWeight={400}
				letterSpacing={2}
			>
				<Link to="/habits">
					<Box cursor={"pointer"} _hover={{ borderBottom: "3px solid black" }}>
						Habits
					</Box>
				</Link>
				<Link to="/">
					<Box cursor={"pointer"} _hover={{ borderBottom: "3px solid black" }}>
						Help
					</Box>
				</Link>
				{!authUser && (
					<Link to="/auth">
						<Box
							cursor={"pointer"}
							border={"1px solid black"}
							backgroundColor={"black"}
							color={"white"}
							_hover={{ color: "black", background: "white" }}
							transition={"0.2s ease-in-out"}
							py={"4px"}
							px={"16px"}
							borderRadius={"32px"}
							fontSize={"22px"}
						>
							Sign in
						</Box>
					</Link>
				)}

				{authUser && (
					<Box
						cursor={"pointer"}
						_hover={{ color: "red" }}
						transition={"0.2s ease-in-out"}
						onClick={handleLogout}
					>
						Sign out
					</Box>
				)}
				{authUser && (
					<Flex
						alignItems={"center"}
						justifyContent={"center"}
						gap={2}
						fontFamily={"Merriweather Sans"}
						letterSpacing={1}
						fontWeight={300}
						px={"24px"}
						py={"4px"}
						backgroundColor={"#fafafa"}
						borderRadius={"32px"}
					>
						<Avatar size={"sm"} src={authUser.profilePicURL} />
						<Text fontSize={18}>{authUser.fullName}</Text>
					</Flex>
				)}
			</Flex>

			<Box
				display={{ base: "flex", md: "none" }}
				cursor={"pointer"}
				ref={btnRef}
				onClick={onOpen}
			>
				<HiOutlineMenuAlt3
					style={{
						color: "black",
						width: "35px",
						height: "35px",
					}}
				/>
			</Box>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay/>
				<DrawerContent pt={"20px"} height={"750px"}>
					<DrawerCloseButton 
          style={{
						color: "black",
						width: "45px",
						height: "45px",
					}}/>
					<DrawerHeader>
          <Flex
            alignItems={"center"}
            justifyContent={"start"}
            gap={2}
            fontFamily={"Merriweather Sans"}
            letterSpacing={1}
            fontWeight={300}
            >
              {authUser && (
                <>
                  <Avatar size={"sm"} src={authUser.profilePicURL} />
                  <Text fontSize={16}>{authUser.fullName}</Text>
                </>
              )
              }
            </Flex>
          </DrawerHeader>
					<DrawerBody>
						<Flex
						flexDirection={"column"}
						justifyContent={"center"}
						alignItems={"start"}
						gap={0}
						fontSize={22}
						fontFamily={"Kanit"}
						fontWeight={400}
						letterSpacing={2}
						>
						<Link to="/habits">
							<Box cursor={"pointer"} _hover={{color:"gray"}} onClick={onClose}>
							Habits
							</Box>
						</Link>
						<Link to="/">
							<Box cursor={"pointer"} _hover={{color:"gray"}} onClick={onClose}>
							Help
							</Box>
						</Link>
						{!authUser && (
							<Link to="/auth">
							<Flex justifyContent={"center"} width={"100%"}>
							<Box
								cursor={"pointer"}
								border={"1px solid black"}
								backgroundColor={"black"}
								color={"white"}
								_hover={{ color: "black", background: "white" }}
								transition={"0.2s ease-in-out"}
								py={"4px"}
								px={"16px"}
								borderRadius={"32px"}
								fontSize={"22px"}
								onClick={onClose}
								mt={12}
								>
								Sign in
								</Box>
							</Flex>
							
							</Link>
						)}

						{authUser && (
							<Flex justifyContent={"space-between"}>
							
							<Box
								cursor={"pointer"}
								_hover={{ color: "red" }}
								transition={"0.2s ease-in-out"}
								onClick={() => {
								handleLogout()
								onClose()
								}}
							>
								Sign out
							</Box>
							
							</Flex>
						)}
						</Flex>

					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};

export default Navbar;
