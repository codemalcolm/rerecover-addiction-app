import { Flex, Text, Box, Image } from "@chakra-ui/react";
import HabitCalendar from "../components/HabitCalendar";

import howToHabit from "../images/how-to-create-habit.png";
import howToEdit from "../images/delete-habit.png"
import howToEditMode from "../images/howto-edit-mode.png"
const HeroPage = () => {
	return (
		<Flex justifyContent={"center"}>
			<Flex mt={12} flexDirection={"column"}>
				<Text fontSize={30} fontFamily={"Kanit"} textAlign={"center"} width={"full"}>
					How to use
					<span
						style={{
							fontSize: 42,
							fontFamily: "Eczar",
							fontWeight: 700,
							marginLeft: 9,
              display:"flex",
              justifyContent:"center"
						}}
					>
					ReRecover
					</span>
				</Text>

        {/* How to Create Habit */}
        <Flex flexDirection={"column"}>
          <Flex justifyContent={{base:"center", md:"start"}}>
            <Text
              fontSize={28}
              fontFamily={"Kanit"}
              mt={16}
              bg={"#ff914d"}
              p={1}
              borderRadius={8}
              width={"240px"}
              color={"white"}
              textAlign={"center"}
            >
              Creating a habit
            </Text>
          </Flex>
          <Box>
            <Image src={howToHabit} />
          </Box>
        </Flex>

        {/* How to Edit Habit */}
        <Flex flexDirection={"column"}>
          <Flex justifyContent={{base:"center", md:"start"}}>
            <Text
              fontSize={28}
              fontFamily={"Kanit"}
              mt={16}
              bg={"#FFBC4D"}
              p={1}
              borderRadius={8}
              width={"240px"}
              color={"white"}
              textAlign={"center"}
            >
              Editting a habit
            </Text>
          </Flex>
          <Box>
            <Image src={howToEdit} />
          </Box>

          <Box>
            <Image src={howToEditMode} />
          </Box>
        </Flex>
			</Flex>
		</Flex>
	);
};

export default HeroPage;
