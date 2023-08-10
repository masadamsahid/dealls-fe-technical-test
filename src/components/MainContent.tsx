"use client";


import React from "react";

const MainContent: React.FC<React.PropsWithChildren> = (
  { children }: React.PropsWithChildren
) => {
  return (
    <div className='bg-slate-200 flex-1 rounded-2xl p-3'>
      {children}
    </div>
  );
}

export default MainContent;