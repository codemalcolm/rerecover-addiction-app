import { Button, Flex, Input } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const {loading, error, login} = useLogin()
	return (
		<Flex flexDirection={"column"} gap={4} w={"320px"}>
			<Input
				placeholder="Email"
				value={inputs.email}
				type="email"
				size={"md"}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<Input
				placeholder="Password"
				value={inputs.password}
				size={"md"}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>
            <Button w={"100%"}
			isLoading={loading} 
			onClick={() => login(inputs)}
			>Log in</Button>
		</Flex>
	);
};

export default Login;
