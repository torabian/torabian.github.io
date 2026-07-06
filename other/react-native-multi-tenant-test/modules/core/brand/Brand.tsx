import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BrandContextType = {
  brand: string;
  setBrand: (brand: string) => Promise<void>;
};

const BrandContext = createContext<BrandContextType | null>(null);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  const [brand, setBrandState] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("brand").then((value) => {
      if (value) {
        setBrandState(value);
      }
    });
  }, []);

  const setBrand = async (value: string) => {
    setBrandState(value);
    await AsyncStorage.setItem("brand", value);
  };

  return (
    <BrandContext.Provider
      value={{
        brand,
        setBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);

  if (!context) {
    throw new Error("useBrand must be used inside BrandProvider");
  }

  return context;
};
