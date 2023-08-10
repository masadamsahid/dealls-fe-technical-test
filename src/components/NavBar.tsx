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
    <div className="flex flex-col gap-2 p-5 justify-center bg-purple-950 w-[300px] rounded-2xl">
      {menus.map(({ name, url }) => (
        <Button
          href={url}
          as={Link}
          p={8}
          colorScheme='yellow'
          variant='solid'
          fontSize={24}
          fontWeight="normal"
          w='100%'
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default NavBar;
