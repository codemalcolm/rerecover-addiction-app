import { Button, Flex, Text } from "@chakra-ui/react";
import AuthForm from "./AuthForm";

const AuthPage = () => {
	return (
		<Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"} my={"auto"}>
			<Flex
				gap={5}
				backgroundColor={"#f9f9f9"}
				minW={"600px"}
				justifyContent={"center"}
				flexDirection={"column"}
				alignItems={"center"}
                py={"16px"}
			>
               <Text textAlign={"center"} fontSize={"38px"}>ReRecover</Text>
               <AuthForm/>
			</Flex>
            
		</Flex>
	);
};

export default AuthPage;
