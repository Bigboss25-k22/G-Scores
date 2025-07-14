import React from 'react';

interface PopupErrorProps {
  message: string;
  onClose: () => void;
}

const PopupError: React.FC<PopupErrorProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-xs w-full text-center relative border-t-8 border-red-500">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
          aria-label="Đóng"
        >
          ×
        </button>
        <div className="flex flex-col items-center mb-3">
          <svg className="w-12 h-12 text-red-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#fee2e2"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <div className="text-red-700 font-bold text-lg mb-1">Lỗi</div>
        </div>
        <div className="text-gray-800 text-base">{message}</div>
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.25s ease;
          }
        `}
      </style>
    </div>
  );
};

export default PopupError; 