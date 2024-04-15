import { Box, Button, Flex, Text } from "@chakra-ui/react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

const AuthPage = () => {
	return (
		<Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"} my={40}>
			<Flex
				gap={5}
				backgroundColor={"#f9f9f9"}
				minW={"600px"}
				justifyContent={"center"}
				flexDirection={"column"}
				alignItems={"center"}
				py={40}
			>
			<Link to='/'>
				<Text
					textAlign={"center"}
					fontSize={36}
					fontFamily={"Eczar"}
					fontWeight={700}
					_hover={{color:"#545454"}}
					transition={"0.1s ease-in-out"}
				>
					ReRecover
				</Text>
			</Link>
			<AuthForm/>
			</Flex>
			
		</Flex>

	);
};

export default AuthPage;
