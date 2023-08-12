"use client";

import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";


interface MenuType {
  name: string;
  url: string;
}

const menus: MenuType[] = [
  {
    name: "Products",
    url: "/products",
  },
  {
    name: "Carts",
    url: "/carts",
  },
];

const NavBar = () => {
  return (
    <div className="flex flex-col gap-3 p-3 justify-start bg-slate-300/40 shadow-2xl min-w-[300px] rounded-2xl">
      {menus.map(({ name, url }) => (
        <Button
          key={url}
          href={url}
          as={Link}
          p={6}
          justifyContent='start'
          colorScheme='purple'
          variant='solid'
          fontSize={16}
          w='100%'
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default NavBar;
