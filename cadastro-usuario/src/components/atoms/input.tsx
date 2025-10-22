import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
      {...props}
    />
  );
}