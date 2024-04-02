import { Box, Flex } from "@chakra-ui/react";
const Navbar = () => {
	return (
		<Flex border={"1px solid black"} justifyContent={"space-between"}>
			<Box textAlign={"center"} ml={5} my={2.5} fontSize={28}
      >
				ReRecover
			</Box>
      <Box textAlign={"center"} ml={5} my={2.5} fontSize={28}
      >
				ReRecover
			</Box>
		</Flex>
	);
};

export default Navbar;
