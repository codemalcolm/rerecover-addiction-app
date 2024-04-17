import { Box, Button, Flex, Text } from "@chakra-ui/react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

const AuthPage = () => {
	return (
		<Flex flexDirection={"row"} justifyContent={"center"} alignItems={"center"} my={"62px"}
		height={"full"}>
			<Flex
				gap={5}
				backgroundColor={"#f9f9f9"}
				minW={{base:"430px", md:"600px"}}
				justifyContent={"center"}
				flexDirection={"column"}
				alignItems={"center"}
				py={40}
				borderRadius={"6px"}
			>
				<Link to="/">
					<Text
						textAlign={"center"}
						fontSize={36}
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
