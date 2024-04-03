import {
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

  const {loading, error, signup} = useSignUpWithEmailAndPassword()

	const [showPassword, setShowPassword] = useState(false);
	return (
		<Flex flexDirection={"column"} gap={4} w={"320px"}>
			<Input
				placeholder="Full Name"
				value={inputs.fullName}
				type="text"
				size={"md"}
				onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
			/>
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
				type={showPassword ? "text" : "password"}
				size={"md"}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>
      		<InputGroup>
				<Input
					placeholder="Confirm Password"
					value={inputs.confirmPassword}
					type={showPassword ? "text" : "password"}
					size={"md"}
					onChange={(e) =>
						setInputs({ ...inputs, confirmPassword: e.target.value })
					}
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
      onClick={() => signup(inputs)}>
      Sign up
      </Button>
		</Flex>

	);
};

export default SignUp;
