import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center my-2 ${className}`}>
      {message}
    </div>
  );
};

export default ErrorMessage; 