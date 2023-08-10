"use client";


import React from "react";

const MainContent: React.FC<React.PropsWithChildren> = (
  { children }: React.PropsWithChildren
) => {
  return (
    <div>
      {children}
    </div>
  );
}

export default MainContent;