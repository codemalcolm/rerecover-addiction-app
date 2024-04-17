import { Button, Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const {loading, error, login} = useLogin()
	const [showPassword, setShowPassword] = useState(false);
	return (
		<Flex flexDirection={"column"} gap={4} w={"320px"}>
			<Input
				placeholder="Email"
				value={inputs.email}
				type="email"
				size={"md"}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<InputGroup>
				<Input
					placeholder="Password"
					value={inputs.password}
					size={"md"}
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
					type={showPassword ? "text" : "password"}
				/>
				<InputRightElement h="full">
					<Button
						variant={"ghost"}
						size={"sm"}
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>
            <Button w={"100%"}
			isLoading={loading} 
			onClick={() => login(inputs)}
			>Log in</Button>
		</Flex>
	);
};

export default Login;
