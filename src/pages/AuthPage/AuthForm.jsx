import React, { useState } from 'react'

import { Button, Flex, Text } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./SignUp";
import { FcGoogle } from "react-icons/fc";
import { Divider } from '@chakra-ui/react'
import GoogleAuth from './GoogleAuth';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <>
        {isLogin ? <Login /> : <Register />}
                
                <Flex alignItems={"center"}>
                    <Divider w={"100px"} color={"gray"}/><Text px={2.5}>OR</Text><Divider w={"100px"} color={"gray"}/>
                </Flex>

                <Flex justifyContent={"space-between"} alignItems={"center"} width={"205px"}>
                    <GoogleAuth isLogin={isLogin}/>
                </Flex>

                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"center"}>
                        <Text noOfLines={[1, 2]} onClick={() => setIsLogin(!isLogin)} cursor={"pointer"} _hover={{color:"lightBlue"}}>
                            {isLogin
                                ? "Don't have an account ?"
                                : "Already have an account ?"}
                        </Text>

                    </Flex>
                </Flex>
                

    </>
    )
}
export default AuthForm