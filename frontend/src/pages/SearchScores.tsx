import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import ErrorMessage from '../components/Common/ErrorMessage';
import PopupError from '../components/Common/PopupError';
import { apiService } from '../services/api';

const SearchScores: React.FC = () => {
  const [regNumber, setRegNumber] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{8}$/.test(regNumber.trim())) {
      setInputError('Registration Number phải gồm đúng 8 chữ số.');
      setShowPopup(true);
      return;
    }
    setInputError(null);
    try {
      setLoading(true);
      const res = await apiService.getStudentInfo(regNumber.trim());
      setData(res);
    } catch (err: any) {
      setInputError(err.message || 'Lỗi không xác định');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputError || data?.error) setShowPopup(true);
  }, [inputError, data]);

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-6 space-y-8">
      {/* Tiêu đề lớn */}
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">Search Scores</h1>
      {/* Dòng Detailed Scores */}
      {(inputError || data?.error) && showPopup && (
        <PopupError
          message={inputError || data?.error || ''}
          onClose={() => setShowPopup(false)}
        />
      )}
      {/* Card chứa form */}
      <div className="bg-white rounded-lg shadow-md border border-gray-300 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800 mb-2">Registration Number:</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={regNumber}
              onChange={e => setRegNumber(e.target.value)}
              placeholder="Enter registration number"
              className="flex-1 px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !regNumber.trim()}
              className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors text-lg"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
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