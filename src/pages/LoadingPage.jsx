import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadingPage = () => {
  return (
    <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='gray.500'
        size='xl'
        />
    </Flex>
  )
}

export default LoadingPage