import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`text-red-600 text-sm mt-1 ${className}`}>
      {message}
    </div>
  );
};

export default ErrorMessage; 