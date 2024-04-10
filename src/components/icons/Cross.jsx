import { RxCross2 } from "react-icons/rx";
import {Box} from "@chakra-ui/react"

const Cross = () => {
  return (
    <Box color={"red"}>
        <RxCross2 style={{
            width: "25px",
            height:"25px",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}/>
    </Box>
  )
}

export default Cross