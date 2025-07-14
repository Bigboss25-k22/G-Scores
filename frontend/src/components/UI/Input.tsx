import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`
        px-3 py-2 border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
};

export default Input; 