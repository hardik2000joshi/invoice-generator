"use client";

import {createContext, useContext, useState, useEffect, ReactNode} from "react";
import { currencyList } from "@/lib/currency";

type CurrencyContextType = {
    symbol: string;
    updateSymbol: (code: string) => void;
};

const CurrencyContext = createContext<CurrencyContextType>({
    symbol: "₹",
  updateSymbol: () => {},
})

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    const saved = localStorage.getItem("currency") || "INR";
    const found = currencyList.find(
      (c) => c.value.toLowerCase() === saved.toLowerCase()
    );
    setSymbol(found?.details.currencySymbol || "₹");
  }, []);

  const updateSymbol = (code: string) => {
    const found = currencyList.find(
      (c) => c.value.toLowerCase() === code.toLowerCase()
    );
    if (found) {
      setSymbol(found.details.currencySymbol);
    }
};

return (
    <CurrencyContext.Provider value= {{symbol, updateSymbol}}>
        {children}
    </CurrencyContext.Provider>
);
};

export const useCurrencySymbol = () => useContext(CurrencyContext)

