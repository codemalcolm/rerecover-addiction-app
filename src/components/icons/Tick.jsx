import { MdDone } from "react-icons/md";
import {Box} from "@chakra-ui/react"

const Tick = () => {
  return (
    <Box color="green">
        <MdDone style={{
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

export default Tick