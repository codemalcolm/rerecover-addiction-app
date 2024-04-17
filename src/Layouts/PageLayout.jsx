import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
const PageLayout = ({ children }) => {
	const { pathname } = useLocation();
	const canRenderNavbar = pathname !== "/auth";
	return (
		<>
			<Flex flexDirection={canRenderNavbar ? "column" : "row"}>
				{/* Navbar */}
				{canRenderNavbar ? <Navbar /> : null}
                <Box
					flex={1}
					w={{ base: "calc(100% - 70px)", md: "calc(100% - 100px)" }}
					mx={"auto"}
				>
					{children}
				</Box>

			</Flex>
		</>
	);
};

export default PageLayout;
