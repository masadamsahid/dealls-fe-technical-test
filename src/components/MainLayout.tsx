"use client"

import React from "react";

import NavBar from "@/components/NavBar";
import MainContent from "@/components/MainContent";

const MainLayout: React.FC<React.PropsWithChildren> = (
  { children }: React.PropsWithChildren
) => {
  return (
    <main>
      <div className="flex p-5 h-[100vh] w-[100vw] gap-5 bg-purple-500 overflow-hidden">
        <NavBar/>
        <MainContent>
          {children}
        </MainContent>
      </div>
    </main>
  );
};

export default MainLayout;