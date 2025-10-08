import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const Createpage = () => {
    const [newprod,setnewprod]=useState({
        name:"",price:"",image:"",
    });
    const toast=useToast();

    const {createProduct}=useProductStore();

    const handleaddprod=async()=>{
        const {success,message}=await createProduct(newprod);
        console.log("SUCCESS",success);
        console.log("MESSAGE",message);
        if(!success){
            toast({
                title:"ERROR",
                description:message,
                status:"error",
                isClosable:true,
            })
        }
        else{
            toast({
                title:"SUCCESS",
                description:message,
                status:"success",
                isClosable:true,
            })
        }
        setnewprod({name:"",price:"",image:""});
    }

  return (
    <>
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>
            <Box
            w={"full"} bg={useColorModeValue("white","gray.800")}
            p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                <Input
                placeholder="NAME" name='name' value={newprod.name}
                onChange={(e)=>setnewprod({...newprod,name:e.target.value})}
                />
                <Input
                placeholder="PRICE" name='price' type='number' value={newprod.price}
                onChange={(e)=>setnewprod({...newprod,price:e.target.value})}
                />
                <Input
                placeholder="IMAGE" name='image' value={newprod.image}
                onChange={(e)=>setnewprod({...newprod,image:e.target.value})}
                />
                <Button colorScheme='blue' onClick={handleaddprod} w={"full"}>
                    Add prod
                </Button>
                </VStack>

            </Box>
        </VStack>
    </Container>
    </>
  )
}

export default Createpage