import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: any;
  icon?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  icon,
  onBlur,
  ...props
}) => {
  return (
    <div className='my-2'>
      {label && (
        <label htmlFor={props.id} className='block text-sm mb-2'>
          {label}
          {props.required && <span className='text-[#FB2C36]'>*</span>}
        </label>
      )}
      <div className='relative'>
        <input
          {...props}
          className={`w-full h-10 px-2 rounded-md bg-[#09090B] border border-[#27272A] text-[#FAFAFA] focus:outline-none focus:border-[#FB2C36] ${props.className}`}
        />{" "}
        {icon && <div className='absolute right-2 top-2'>{icon}</div>}
      </div>
      {error && <p className='text-sm text-[#FB2C36]'>{error.message}</p>}
    </div>
  );
};

export default CustomInput;
