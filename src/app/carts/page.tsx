"use client";

import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import axios from "axios";
import {
  Avatar,
  Badge, Box,
  Button,
  Progress, Stack,
  Table,
  TableContainer,
  Tbody,
  Td, Text,
  Thead, Tooltip,
  Tr
} from "@chakra-ui/react";

interface DummyProducts {
  data: any[];
  total: number;
  skip: number;
  limit: number;
}

const Page = () => {
  
  const [isLoadingCarts, setIsLoadingCarts] = useState<boolean>(true);
  const [carts, setCarts] = useState<DummyProducts | null>(null);
  
  const [isLoadingCartOwner, setIsLoadingCartOwner] = useState<boolean>(false);
  const [cartOwner, setCartOwner] = useState<any>();
  
  const [page, setPage] = useState<number>(1);
  const maxPage = Math.ceil((carts?.total || 0)/(carts?.limit || 1));
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingCarts(true);
      await axios.get(`https://dummyjson.com/carts`, {
        params: {
          limit: 10,
          skip: (page-1) * 10,
        }
      }).then((res) => {
        setCarts(prevState => ({
          data: [...res.data.carts],
          total: res.data.total,
          skip: res.data.skip,
          limit: res.data.limit,
        }));
      });
      setIsLoadingCarts(false);
    }
    
    fetchProducts();
  }, [page]);
  
  const summaryProducts = (products: any[]) => {
    
    products = products.map((p) => p.title);
    
    return products.length <= 3
      ? products.join(", ")
      : (
        <>
          {products.slice(0,2).join(", ")}, <Badge colorScheme='purple'>
            and {products.length - 2} more
          </Badge>
        </>
      )
    ;
  }
  
  const getOwnerByID = async (ownerId: number) => {
    setIsLoadingCartOwner(true);
    try {
      const owner = await axios.get(`https://dummyjson.com/users/${ownerId}`).then((res) => res.data);
      setCartOwner(owner);
      setIsLoadingCartOwner(false);
    } catch (err) {
      setIsLoadingCartOwner(false);
    }
  }
  
  const Owner = (
    <Stack minWidth='200px'>
      {isLoadingCartOwner ? <Progress size='xs' isIndeterminate colorScheme='yellow' bgColor='transparent' /> : (
        <>
          <Stack direction='row' alignItems='center'>
            <p>
              Owned by:
            </p>
            <Avatar
              border='4px'
              bgColor='gray.400'
              src={cartOwner?.image}
              name={cartOwner?.firstName + cartOwner?.firstName}
              size='md'
            />
            <p>@<b>{cartOwner?.username}</b></p>
          </Stack>
          <p>(Click to check details)</p>
        </>
      )}
    </Stack>
  );
  
  return (
    <MainLayout>
      <div className='w-[100%] min-h-[100%] flex flex-col gap-2 justify-center'>
        <section id="results" className="p-4 flex flex-col gap-5">
          <TableContainer>
            <Table
              variant='striped'
              size='sm'
              border='2px'
            >
              <Thead>
                <Tr bg={"purple.200"}>
                  {['CartID', 'Products', 'Tot. Qty', 'Price'].map((val) => {
                    return (
                      <Td key={val} fontSize='sm' textAlign='center'>
                        <b>
                          {val}
                        </b>
                      </Td>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {carts?.data.map((cart, index, array) => {
                  return (
                    <Tr key={cart.id}>
                      <Td textAlign='center'>{cart.id}</Td>
                      <Td>
                        <Tooltip
                          p={4}
                          rounded='md'
                          onOpen={() => getOwnerByID(cart.userId)}
                          label={Owner}
                        >
                          <Box as={NextLink} p={3} cursor='pointer' href={`/carts/${cart.id}`}>
                            <p>
                              {summaryProducts(cart.products)}
                            </p>
                          </Box>
                        </Tooltip>
                      </Td>
                      <Td textAlign='center'>{cart.totalQuantity}</Td>
                      <Td>
                        <Tooltip
                          p={4}
                          rounded='md'
                          label={(
                            <ul>
                              <li>Total Price: $ {cart.total}</li>
                              <li>Discounted to: $ {cart.discountedTotal}</li>
                            </ul>
                          )}
                        >
                          <Stack alignItems='center'>
                            <Badge p={1}  colorScheme='whatsapp' fontSize='md' width='fit-content' variant='subtle'>
                              $ {cart.discountedTotal}
                            </Badge>
                            <Text p={1} color='gray.600' fontSize='xs' width='fit-content'>
                              <del>$ {cart.total}</del>
                            </Text>
                          </Stack>
                        </Tooltip>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <div className='p-4 flex gap-4 justify-end items-center'>
            <Button
              colorScheme='purple' isLoading={isLoadingCarts} variant='ghost'
              isDisabled={page <= 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Prev
            </Button>
            <div>
              {isLoadingCarts ? 'Loading ...' : (
                <>Page {page} /{maxPage}</>
              )}
            </div>
            <Button
              colorScheme='purple' isLoading={isLoadingCarts} variant='ghost'
              isDisabled={page >= maxPage}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Page;