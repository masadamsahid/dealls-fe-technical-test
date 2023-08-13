"use client";

import MainLayout from "@/components/MainLayout";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  InputGroup, InputLeftAddon,
} from "@chakra-ui/react";
import ProductsTable, { DummyProducts } from "@/components/ProductsTable";

const Page = () => {
  
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);
  const [products, setProducts] = useState<DummyProducts | null>(null);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  
  const pageSize = 10;
  
  const maxPage = Math.ceil((products?.total || 0)/pageSize);
  
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
          limit: pageSize,
          skip: (page-1) * pageSize,
          q: search,
        }
      }).then((res) => {
        console.log({ res })
        setProducts(prevState => ({
          data: [...res.data.products],
          total: res.data.total,
          skip: res.data.skip,
          limit: pageSize,
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
            <InputGroup colorScheme='purple' size='sm'>
              <InputLeftAddon bgColor='purple.300' border={1}>
                Search
              </InputLeftAddon>
              <Input
                name="search"
                borderColor='gray.400'
                border='1px solid gray'
                focusBorderColor={'purple.200'}
                placeholder='Search products (Press Enter)'
              />
            </InputGroup>
          </form>
        </section>
        <section id="results" className="flex flex-col gap-5">
          <ProductsTable
            isLoading={isLoadingProduct}
            products={products}
            page={page}
            setPage={setPage}
            maxPage={maxPage}
          />
        </section>
      </div>
    </MainLayout>
  );
}

export default Page;