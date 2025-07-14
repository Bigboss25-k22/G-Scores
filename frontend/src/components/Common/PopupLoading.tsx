import React from 'react';

const PopupLoading: React.FC<{ message?: string }> = ({ message = "Đang tải dữ liệu..." }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-white rounded-lg shadow-lg px-8 py-6 flex flex-col items-center">
      <svg className="animate-spin h-6 w-6 text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span className="text-blue-600 font-semibold">{message}</span>
    </div>
  </div>
);

export default PopupLoading; 