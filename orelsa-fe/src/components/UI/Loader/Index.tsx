"use client";
import React, { useEffect, useState } from "react";

const Loader = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <div className="flex flex-col justify-center items-center">
            <div className="spinner-border animate-spin border-4 border-solid border-[#B88E2F] border-t-transparent rounded-full w-16 h-16"></div>
            <p className="text-lg text-[#B88E2F] font-semibold">Yüklənir...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
