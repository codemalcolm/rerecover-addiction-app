import { Box, Flex, Image, Text } from "@chakra-ui/react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import authIllustration from "../../images/greetings.svg";

const AuthPage = () => {
	return (
		<Flex
			flexDirection={"row"}
			justifyContent={"center"}
			alignItems={"center"} // Centering vertically
			backgroundColor={"#f9f9f9"}
			width={"full"}
			height={"100vh"} // Optionally, you can set a height to center the content vertically within the viewport
		>
			<Flex>
				
			</Flex>
			<Box width={"30%"} display={{base:"none", xl:"block"}}>
				<Image src={authIllustration} />
			</Box>
			<Flex
				gap={5}
				justifyContent={"center"}
				flexDirection={"column"}
				alignItems={"center"} 
				borderRadius={"6px"}
			>
				<Link to="/">
					<Text
						textAlign={"center"}
						fontSize={{base:"36px", xl:"70px"}}
						fontFamily={"Eczar"}
						fontWeight={700}
						_hover={{ color: "#545454" }}
						transition={"0.1s ease-in-out"}
					>
						ReRecover
					</Text>
				</Link>
				<AuthForm />
			</Flex>
		</Flex>

	);
};

export default AuthPage;
