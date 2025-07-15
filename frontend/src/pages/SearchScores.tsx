import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import ErrorMessage from '../components/Common/ErrorMessage';
import PopupError from '../components/Common/PopupError';

const SearchScores: React.FC = () => {
  const [regNumber, setRegNumber] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { data, loading, error, execute, reset } = useApi<any>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{8}$/.test(regNumber.trim())) {
      setInputError('Registration Number phải gồm đúng 8 chữ số.');
      setShowPopup(true);
      return;
    }
    setInputError(null);
    execute(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000'}/students/${regNumber.trim()}`);
  };

  useEffect(() => {
    if (error) setShowPopup(true);
  }, [error]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {(inputError || error) && showPopup && (
        <PopupError
          message={inputError || error || ''}
          onClose={() => setShowPopup(false)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number:</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={regNumber}
            onChange={e => setRegNumber(e.target.value)}
            placeholder="Enter registration number"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !regNumber.trim()}
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
      {data && data.success && data.data && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="mb-4 text-green-700 font-semibold text-center">
            Kết quả tra cứu cho thí sinh: {data.data.name}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border mt-4 mx-auto text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border text-center">Số Báo Danh</th>
                  {data.data.subjects.map((s: any, idx: number) => (
                    <th key={idx} className="px-4 py-2 border text-center">{s.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-semibold text-center">{data.data.regNumber}</td>
                  {data.data.subjects.map((s: any, idx: number) => (
                    <td key={idx} className="px-4 py-2 border text-center">{s.score}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchScores; 