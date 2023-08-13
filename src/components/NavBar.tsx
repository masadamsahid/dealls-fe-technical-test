"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";


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
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState<boolean>(false);
  
  return (
    <>
      <div
        className="hidden lg:flex flex-col gap-3 p-3 justify-start bg-slate-300/40 shadow-2xl min-w-[300px] rounded-2xl"
      >
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
      <button
        onClick={()=>setIsDrawerMenuOpen(true)}
        className="fixed lg:hidden bottom-5 left-[50%] -translate-x-[50%] z-[900]
                   p-2 bg-yellow-500 border border-black rounded-lg drop-shadow-lg min-w-[80px]
                   text-sm"
      >
        &#8801; Menu
      </button>
      <Drawer
        placement='bottom'
        isOpen={isDrawerMenuOpen}
        onClose={()=>setIsDrawerMenuOpen(false)}
      >
        <DrawerOverlay/>
        <DrawerContent roundedTop='3xl'>
          <DrawerHeader borderBottomWidth='1px'>Navigation</DrawerHeader>
          <DrawerBody borderBottomWidth='1px' display='flex' flexDir='column' gap={2} p={2}>
            {menus.map(({ name, url }) => (
              <Button
                key={url}
                href={url}
                as={Link}
                p={6}
                justifyContent='start'
                colorScheme='yellow'
                variant='solid'
                fontSize={16}
                w='100%'
              >
                {name}
              </Button>
            ))}
          </DrawerBody>
          <DrawerFooter display='flex' justifyContent='center' p={1}>
            <Button colorScheme='yellow' variant='ghost' onClick={()=>setIsDrawerMenuOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
