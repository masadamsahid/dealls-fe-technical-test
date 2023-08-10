"use client";

import MainLayout from "@/components/MainLayout";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
import {
  Button, Input,
  InputGroup, InputLeftAddon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";

interface DummyProducts {
  data: any[];
  total: number;
  skip: number;
  limit: number;
}

const Page = () => {
  
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);
  const [products, setProducts] = useState<DummyProducts | null>(null);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  
  const maxPage = Math.ceil((products?.total || 0)/(products?.limit || 1));
  
  const doSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ e });
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    setSearch(prevState => target?.search?.value)
  }
  
  useEffect(() => {
    setPage(1);
  }, [search])
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProduct(true);
      await axios.get(`https://dummyjson.com/products${search ? `/search` : ""}`, {
        params: {
          limit: 10,
          skip: (page-1) * 10,
          q: search,
        }
      }).then((res) => {
        console.log({ res })
        setProducts(prevState => ({
          data: [...res.data.products],
          total: res.data.total,
          skip: res.data.skip,
          limit: res.data.limit,
        }));
      });
      setIsLoadingProduct(false);
    }
    
    fetchProducts();
  }, [page, search]);
  
  console.log({ search, page, products });
  
  return (
    <MainLayout>
      <div className='w-[100%] min-h-[100%] flex flex-col gap-2'>
        <section id="search" className="flex justify-end items-center">
          <form onSubmit={doSearch}>
            <InputGroup colorScheme='purple'>
              <InputLeftAddon bgColor='purple.300' border={2}>
                Search
              </InputLeftAddon>
              <Input
                name="search"
                borderColor='gray.400'
                border='2px solid gray'
                focusBorderColor={'purple.200'}
                placeholder='Search products'
              />
            </InputGroup>
          </form>
        </section>
        <section id="results" className="flex flex-col gap-5">
          <TableContainer
            className="max-h-[400px]"
            overflowY={"auto"}>
            <Table
              variant='striped'
              size='md'
            >
              {/*<TableCaption>Imperial to metric conversion factors</TableCaption>*/}
              <Thead>
                <Tr bg={"purple.200"}>
                  {['Product', 'Brand', 'Price', 'Stock', 'Category'].map((val) => {
                    return (
                      <Th key={val} fontSize='md'>
                        <b>
                          {val}
                        </b>
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {products?.data.map((product, index, array) => {
                  return (
                    <Tr key={product.id}>
                      <Td>{product.title}</Td>
                      <Td>{product.brand}</Td>
                      <Td>{product.price}</Td>
                      <Td>{product.stock}</Td>
                      <Td>{product.category}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
              <Tfoot>
              </Tfoot>
            </Table>
          </TableContainer>
          <div className='p-4 flex gap-4 justify-end items-center'>
            <Button
              colorScheme='purple' isLoading={isLoadingProduct} variant='ghost'
              isDisabled={page <= 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Prev
            </Button>
            <div>
              {isLoadingProduct ? 'Loading ...' : (
                <>Page {page} /{maxPage}</>
              )}
            </div>
            <Button
              colorScheme='purple' isLoading={isLoadingProduct} variant='ghost'
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