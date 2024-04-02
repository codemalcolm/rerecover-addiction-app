import { Button, Flex, Input } from "@chakra-ui/react";

const Login = () => {
	return (
		<Flex flexDirection={"column"} gap={4} w={"320px"}>
			<Input placeholder="Email " type="email" size={"md"} />
			<Input placeholder="Password" type="text" size={"md"} />
            <Button w={"100%"}>Log in</Button>
		</Flex>
	);
};

export default Login;
