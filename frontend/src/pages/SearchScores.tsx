import React, { useState } from 'react';
import { useTopBlock } from '../hooks/useTopBlock';

const SearchScores: React.FC = () => {
  const [regNumber, setRegNumber] = useState('');
  const { data, loading, error, search } = useTopBlock();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim()) search(regNumber.trim());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
      {data && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-bold mb-2">{data.data.name} ({data.data.regNumber})</h2>
          <table className="min-w-full border mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Subject</th>
                <th className="px-4 py-2 border">Score</th>
                <th className="px-4 py-2 border">Type</th>
              </tr>
            </thead>
            <tbody>
              {data.data.subjects.map((s, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border">{s.name}</td>
                  <td className="px-4 py-2 border">{s.score}</td>
                  <td className="px-4 py-2 border">{s.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchScores; 