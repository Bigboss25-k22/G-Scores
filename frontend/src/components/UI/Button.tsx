import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  };

  const sizes = {
    small: 'px-4 py-1 text-sm',
    medium: 'px-6 py-2',
    large: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 