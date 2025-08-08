export const getCurrencySymbol = (code: string): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    AED: "د.إ",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
  };
  return symbols[code] || code;
};
