"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CurrencyInput from "@/app/component/ui/currencyInput";
import { currencyList } from "@/lib/currency";
import { Input } from "@/app/component/ui/input";
import { Plus, Trash2 } from "lucide-react";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import { useGetValue } from "@/app/hooks/useGetValue";
import { Controller, useFormContext } from "react-hook-form";
import { useCurrencySymbol } from "@/app/context/currencyContext";
import { InvoiceFormValues, InvoiceItem } from "@/types/invoice";

export const InvoiceDetailsForm = () => {
  const {control} = useFormContext<InvoiceFormValues>();
  const value = useGetValue("currency", "INR");

  const {symbol} = useCurrencySymbol();

  const persistInvoiceItems = (newItems: InvoiceItem[]) => {
    try {
      const saved = localStorage.getItem("invoiceData");
      const data = saved ? JSON.parse(saved) : {};
      data.invoiceDetails = data.invoiceDetails || {};
      data.invoiceDetails.items = newItems;
      localStorage.setItem("invoiceData", JSON.stringify(data));
    }

    catch {

    }
  };

  return (
    <Controller
    control = {control}
    name = "invoiceDetails.items"
      render={({ field: { onChange, value } }) => {
        const items: InvoiceItem[] =(value ?? []) as InvoiceItem[];

        const updateItems = (newItems: InvoiceItem[]) => {
          onChange(newItems);
          persistInvoiceItems(newItems);
        };

        return (
           <div className="pt-24">
          <p className="text-2xl font-semibold pb-3">Invoice Details</p>
          <div className="flex flex-col gap-6">
            {/*currency*/}
            <div>
              <p className="pt-3 font-medium text-neutral-500">
                Select an invoice currency
              </p>
              <CurrencyInput />
            </div>

            {/*Items*/}
            <div>
              <p className="py-3 font-medium text-sm text-neutral-500">Items</p>
              {items.map((item, index) => {
                const {description, qty, price} = item;
                return (
                  <div
                    className="flex relative items-center group -ml-8"
                    key={index}
                  >

                    {/*Delete button*/}
                    <div
                      className={`w-9 h-7 ${items.length === 1 ? "invisible": ""}`}
                    >
                      <button
                        onClick={() => {
                          const newList = [...items];
                          newList.splice(index, 1);
                          updateItems(newList);
                        }}
                        type="button"
                        className="flex-shrink-0 rounded-md p-1.5 group-hover:bg-gray-50 hidden group-hover:block"
                      >
                        <Trash2 className="w-4 text-gray-500 h-4 group-hover:text-red-400" />
                      </button>
                    </div>

                    {/*Item Name*/}
                    <div className="w-full flex-1">
                      <Input
                        placeholder="Item name"
                        value={description}
                        type="text"
                        onChange={(e) => {
                          const updatedArray = [...items];
                          updatedArray[index] = {
                            ...updatedArray[index], 
                            description: e.target.value,
                          };
                          updateItems(updatedArray);
                        }}
                      />
                    </div>

                    {/*Qty*/}
                    <div className="w-14">
                      <Input
                        placeholder="Qty"
                        value={qty ?? ""}
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            /^-?\d*\.?\d*$/.test(inputValue) ||
                            inputValue === ""
                          ) {
                            const updatedArray = [...items];
                            updatedArray[index] = {
                              ...updatedArray[index],
                              qty: inputValue === "" ? 0 : Number(inputValue),
                            };
                            updateItems(updatedArray)
                          }
                        }}
                      />
                    </div>

                    {/*Price*/}
                    <div className="w-14">
                      <Input
                        placeholder="Price"
                        value={price ?? ""}
                        type="number"
                        /*pattern="[0-9]*"*/
                        step="any"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            /^-?\d*\.?\d*$/.test(value) ||
                            value === ""
                          ) {
                            const updatedArray = [...items];
                            updatedArray[index] = {
                              ...updatedArray[index],
                              price: value === "" ? 0 : Number(value),
                            };
                            updateItems(updatedArray);
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              }
              )}

              {/*Add Item Button*/}
              <div className="py-3 border-dashed border-b border-gray-300">
                <button
                  onClick={() => {
                    const newList = [...items, {description: "", qty: 1, price: 0}];
                    updateItems(newList);
                  }}
                  type="button"
                  className="flex justify-center items-center text-orange-500 font-medium text-sm gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <p>Add Item</p>
                </button>
              </div>
            </div>

            {/*Note*/}
            <div>
              <p className="pt-3 font-medium text-sm text-neutral-500 pb-5">
                Note
              </p>
              {/* note field lives under invoiceDetails.note in your types */}
              <CustomTextInput placeholder="Add a note" variableName="invoiceDetails.note" />
            </div>

            {/*More Options*/}
            <div>
              <p className="pt-3 font-medium text-sm text-neutral-500 pb-5">
                More options
              </p>
              <CustomNumberInput
                label="Discount"
                placeholder={`${symbol}0`}
                variableName="invoiceDetails.discount"
              />
              <CustomNumberInput
                label="Taxes"
                placeholder="0%"
                variableName="invoiceDetails.taxRate"
              />
            </div>
            </div>
        </div>
                );
              }}
    />
  );
};    