"use client";

import { Box, Heading, Progress, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

interface TypeProps extends React.PropsWithChildren {
  isLoading: boolean;
  products: CartProduct[];
}

const CartProductsTable: React.FC<TypeProps> = ({
  products,
  isLoading
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
              {['Product', 'Qty', 'Price', 'Total', '% Discount', 'Discounted Total Price'].map((val) => {
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
              ) : products?.map((product, index, array) => {
                return (
                  <Tr key={product.id}>
                    <Td>{product.title}</Td>
                    <Td>{product.quantity}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.total}</Td>
                    <Td>{product.discountPercentage}</Td>
                    <Td>{product.discountedPrice}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartProductsTable;