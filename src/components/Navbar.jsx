import { Avatar, Box, Button, Flex,Text } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthStore from "../store/authStore";
const Navbar = () => {
  const {handleLogout, isLoggingOut, error} = useLogout();
  const authUser = useAuthStore((state) => state.user)
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
        {!authUser &&
          <Link to='/auth'>
            <Box cursor={"pointer"} >
              Sign in
            </Box>
          </Link>
        }

        {authUser &&
          <Box cursor={"pointer"}
          _hover={{color:"red"}}
          transition={"0.2s ease-in-out"}
          onClick={handleLogout}>
            Sign out
          </Box>
        }
        {authUser &&
          <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
            <Avatar size={"sm"} src={authUser.profilePicURL}/>
            <Text fontSize={18}>{authUser.fullName}</Text>
          </Flex>
        }

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
