import { Box, Flex } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<Flex border={"1px solid black"} justifyContent={"space-between"} alignItems={"center"} pl={5} pr={8} py={2.5}>
			<Box textAlign={"center"} fontSize={28}
      >
				ReRecover
			</Box>
      <Flex justifyContent={"center"} alignItems={"center"} gap={5}  fontSize={22}
      display={{base: "none", md:"flex"}}
      >
        <Link to='/habits'>
          <Box cursor={"pointer"}>
            Habits
          </Box>
        </Link>
        <Link to='/'>
          <Box cursor={"pointer"}>
            Help
          </Box>
        </Link>
        
        <Link to='/auth'>
          <Box cursor={"pointer"}>
            Sign in
          </Box>
        </Link>
			</Flex>
      <Box display={{base: "flex", md:"none"}} cursor={"pointer"}>
        <RxHamburgerMenu
          style={{
            color: "black",
            width:"30px",
            height:"30px"
          }}
        />
      </Box>

		</Flex>
	);
};

export default Navbar;
