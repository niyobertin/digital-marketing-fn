import React from "react";
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error: string | undefined;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  register,
  error,
  className,
}) => (
  <div className="py-1">
    <input
      className={`w-full border-b bg-transparent font-normal text-normal text-white py-1 border-b-2 border-green-500 outline-none ${className}`}
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);


interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  placeholder:string;
  options: Option[];
  error: string | undefined;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  register,
  placeholder,
  options,
  error,
  className,
}) => (
  <div className="py-1">
    <select
      className={`w-full border-b bg-[#233a2f] font-normal text-normal text-white py-1 border-b-2 border-green-500 outline-none ${className}`}
      {...register(name)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

