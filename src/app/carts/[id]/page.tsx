"use client";

import MainLayout from "@/components/MainLayout";
import { useParams } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Progress,
  Stack,
  StackDivider, Table, Tbody,
  Text, Thead, Tooltip, Tr
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CartProductsTable from "@/components/CartProductsTable";
import { PhoneIcon, TriangleDownIcon } from "@chakra-ui/icons";

const Page = () => {
  
  const params = useParams();
  
  const [cart, setCart] = useState<any>();
  const [owner, setOwner] = useState<any>();
  
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingOwner, setIsLoadingOwner] = useState(false);
  
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoadingCart(true);
      try {
        await axios.get(`https://dummyjson.com/cart/${params.id}`).then((res) => {
          setCart(res.data);
        });
      } catch (err) {
      }
      setIsLoadingCart(false);
    }
    
    fetchCart();
  }, [params.id]);
  
  useEffect(() => {
    const fetchOwner = async () => {
      setIsLoadingOwner(true);
      try {
        await axios.get(`https://dummyjson.com/user/${cart?.userId}`).then((res) => {
          setOwner(res.data);
        });
      } catch (err) {
      }
      setIsLoadingOwner(true);
    }
    
    if (typeof cart?.userId === 'number') fetchOwner();
  }, [cart]);
  
  console.log({ owner })
  
  return (
    <MainLayout>
      <div className='w-[100%] min-h-[100%] flex flex-col gap-2 justify-center'>
        <section id="cart-infos" className="p-4 flex flex-col gap-5">
          <Heading size='md'>
            Cart #{params.id}
          </Heading>
          {
            !isLoadingCart && !isLoadingOwner ? (
              <Progress isIndeterminate bg='gray.400' colorScheme='purple' size='xs' />
            ) : (
              <Stack>
                <Card bgColor='white' w='80%' margin='auto'>
                  <CardHeader>
                    <Heading size='lg'>Details</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack flexDir='row' divider={<StackDivider />} gap={7}>
                      <Stack gap={5} flex={1}>
                        <Box>
                          <Heading size='md'>
                            User
                          </Heading>
                          <Tooltip
                            placement='top-start'
                            label={(
                              <Stack p={4}>
                                <Stack direction='row' alignItems='center'>
                                  <Avatar
                                    size='sm'
                                    border='2px'
                                    borderColor='gray'
                                    bgColor='gray'
                                    src={owner?.image}
                                  />
                                  <Box>
                                    <Text size='sm'>{owner?.firstName} {owner?.lastName}</Text>
                                    <Text size='sm'>@{owner?.username} | {owner?.email}</Text>
                                  </Box>
                                </Stack>
                                <Stack direction='row'>
                                  <Text size='md'><PhoneIcon/> {owner?.phone}</Text>
                                  <Text size='md'><TriangleDownIcon/> {owner?.address?.city}</Text>
                                </Stack>
                              </Stack>
                            )}
                          >
                            <Text pt='2' fontSize='sm' cursor='pointer'>
                              {owner?.username}
                            </Text>
                          </Tooltip>
                        </Box>
                        <Box>
                          <Heading size='md'>
                            Added On
                          </Heading>
                          <Text pt='2' fontSize='sm'>
                            a year ago.
                          </Text>
                        </Box>
                      </Stack>
                      
                      <Stack gap={5} flex={1}>
                        <Box>
                          <Heading size='md'>
                            # of Items
                          </Heading>
                          <Text pt='2' fontSize='sm'>
                            {cart?.totalProducts}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size='md'>
                            Total Amount
                          </Heading>
                          <Text pt='2' fontSize='sm'>
                            $ {cart?.discountedTotal} <del>($ {cart?.total})</del>
                          </Text>
                        </Box>
                      </Stack>
                    </Stack>
                  </CardBody>
                </Card>
              </Stack>
            )
          }
        </section>
        
        <section id="products" className="p-4 flex flex-col gap-5">
          <Heading size='md'>
            Products
          </Heading>
          <Card>
            <CardBody>
              <CartProductsTable isLoading={isLoadingCart && isLoadingOwner} products={cart?.products} />
            </CardBody>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
};

export default Page;