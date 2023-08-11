"use client";

import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Button,
  Heading,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";

export interface DummyProducts {
  data: any[];
  total: number;
  skip: number;
  limit: number;
}

interface TypeProps extends React.PropsWithChildren {
  isLoading: boolean;
  products: DummyProducts | null;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
}

const ProductsTable: React.FC<TypeProps> = ({
  products,
  isLoading,
  page,
  setPage,
  maxPage,
}) => {
  return (
    <div>
      <TableContainer
        className="max-h-[400px]"
        overflowY={"auto"}>
        <Table
          variant='striped'
          size='md'
        >
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
            {isLoading
              ? (
                <Tr>
                  <Td colSpan={5}>
                    <Box display='flex' flexDir='column' gap={2} p={2} alignItems='center'>
                      <Heading color='gray.400'>Loading</Heading>
                      <Progress size='xs' bg='gray.400' colorScheme='purple' isIndeterminate w='80%'/>
                    </Box>
                  </Td>
                </Tr>
              ) : products?.data.map((product, index, array) => {
                return (
                  <Tr key={product.id}>
                    <Td>{product.title}</Td>
                    <Td>{product.brand}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.stock}</Td>
                    <Td>{product.category}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
      <div className='p-4 flex gap-4 justify-end items-center'>
        <Button
          colorScheme='purple' isLoading={isLoading} variant='ghost'
          isDisabled={page <= 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Prev
        </Button>
        <div>
          {isLoading ? 'Loading ...' : (
            <>Page {page} /{maxPage}</>
          )}
        </div>
        <Button
          colorScheme='purple' isLoading={isLoading} variant='ghost'
          isDisabled={page >= maxPage}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductsTable;