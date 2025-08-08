"use client";

import { Input } from "@/app/component/ui/input";
import { getInitialValue } from "@/lib/getInitialValue";
import { Controller, useFormContext } from "react-hook-form";

type CustomNumberProps = {
  label?: string;
  placeholder: string;
  variableName: string;
};

export const CustomNumberInput = ({
  label,
  placeholder,
  variableName,
}: CustomNumberProps) =>{
  const {control} = useFormContext();
   return (
    <Controller
      control={control}
      name={variableName}
      defaultValue={getInitialValue(variableName)}
      render={({ field: { onChange, value } }) => (
        <div className="flex flex-col gap-1">
          {label && <label className="text-sm font-medium">{label}</label>}
          <Input
            placeholder={placeholder}
            value={value || ""}
            type="number"
            onChange={(e) => {
              const updatedValue = e.target.value;
              localStorage.setItem(variableName, updatedValue);
              onChange(updatedValue);
            }}
          />
        </div>
  )}
  />
);
};

export default CustomNumberInput;
