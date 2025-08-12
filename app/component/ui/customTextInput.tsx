"use client";

import { Input } from "@/app/component/ui/input";
import { getInitialValue } from "@/lib/getInitialValue";
import { Controller, useFormContext } from "react-hook-form";

interface CustomTextInputProps {
  label?: string;
  placeholder: string;
  variableName: string;
};

export default function CustomTextInput ({
  label,
  placeholder,
  variableName,
}: CustomTextInputProps) {
  const {control, watch} = useFormContext();

  const currentValue = watch(variableName);
  console.log(`[CustomTextInput] ${variableName} value:`, currentValue);

  return (

    <Controller
    name={variableName}
      control={control}
      defaultValue={getInitialValue(variableName)}
    render={({ field: { onChange, value } }) => (
      <div className="flex flex-col gap-1">
          {label && <label className="text-sm font-medium">{label}</label>}
      <Input
        label={label}
        placeholder={placeholder}
        value={value || ""}
        type="text"
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
