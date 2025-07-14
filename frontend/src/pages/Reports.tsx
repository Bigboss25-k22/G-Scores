import React, { useState } from 'react';
import { useSubjectReport } from '../hooks/useSubjectReport';
import { BarChart } from '../components/Report/BarChart';
import PopupError from '../components/Common/PopupError';
import PopupLoading from '../components/Common/PopupLoading';
import { useTopBlock } from '../hooks/useTopBlock';
import TopBlockTable from '../components/Report/TopBlockTable';

const SUBJECTS = [
  { label: 'Toán', value: 'Toán' },
  { label: 'Ngữ văn', value: 'Ngữ văn' },
  { label: 'Ngoại ngữ', value: 'Ngoại ngữ' },
  { label: 'Vật lí', value: 'Vật lí' },
  { label: 'Hóa học', value: 'Hóa học' },
  { label: 'Sinh học', value: 'Sinh học' },
  { label: 'Lịch sử', value: 'Lịch sử' },
  { label: 'Địa lí', value: 'Địa lí' },
  { label: 'GDCD', value: 'GDCD' },
];

const LEVEL_SCORE = [
  { level: 'Giỏi', min: 8, color: 'bg-green-500' },
  { level: 'Khá', min: 6, color: 'bg-blue-500' },
  { level: 'Trung bình', min: 4, color: 'bg-yellow-400' },
  { level: 'Yếu', min: 0, color: 'bg-red-500' },
];

const LEVEL_COLORS: Record<string, string> = {
  'Giỏi': 'bg-green-500 text-white',
  'Khá': 'bg-blue-500 text-white',
  'Trung bình': 'bg-yellow-400 text-gray-900',
  'Yếu': 'bg-red-500 text-white',
};

const DOT_COLORS: Record<string, string> = {
  'Giỏi': 'bg-green-500',
  'Khá': 'bg-blue-500',
  'Trung bình': 'bg-yellow-400',
  'Yếu': 'bg-red-500',
};

function getLevel(score: number) {
  if (score >= 8) return 'Giỏi';
  if (score >= 6) return 'Khá';
  if (score >= 4) return 'Trung bình';
  return 'Yếu';
}

const Reports: React.FC = () => {
  const [subject, setSubject] = useState<string>('Toán');
  const [showPopup, setShowPopup] = useState(false);
  const { data, loading, error, search } = useSubjectReport();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const handleSearch = () => {
    search(subject);
  };

  React.useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [subject]);

  React.useEffect(() => {
    if (error) setShowPopup(true);
  }, [error]);

  // Chuẩn hóa dữ liệu cho BarChart
  const chartData = data?.data.scoreDistribution.map(item => ({
    score: item.score,
    count: item.count,
    level: getLevel(item.score),
  })) || [];

  // State cho top block
  const [block, setBlock] = React.useState<string>('A');
  const { data: topBlockData, loading: topBlockLoading, error: topBlockError, fetchTopBlock } = useTopBlock();

  const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBlock(e.target.value);
  };

  React.useEffect(() => {
    fetchTopBlock(block);
    // eslint-disable-next-line
  }, [block]);

  return (
    <div className="max-w-8xl mx-auto">

      {/* Tiêu đề cho chức năng phân bố điểm */}
      <h2 className="text-xl font-bold mb-4 text-blue-700">Phân bố điểm theo môn học</h2>
      <div className="w-full flex justify-center mt-4">
        <div className="w-full max-w-8xl border rounded-lg shadow p-6 bg-white">
          {/* Dropdown chọn môn học nằm trong border */}
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <label className="font-semibold">Chọn môn học:</label>
            <select
              value={subject}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SUBJECTS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          {/* Thông tin tổng quan */}
          {data && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-4 mb-2">
                {data.data.levels && Object.entries(data.data.levels).map(([level, count]) => (
                  <div
                    key={level}
                    className={`px-3 py-1 rounded text-sm font-semibold flex items-center gap-2 ${LEVEL_COLORS[level] || 'bg-gray-100 border'}`}
                  >
                    <span className={`w-3 h-3 rounded inline-block ${DOT_COLORS[level]}`}></span>
                    {level}: <span className="ml-1 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Popup loading */}
          {loading && <PopupLoading message="Đang tải dữ liệu..." />}
          {/* Popup error */}
          {error && showPopup && (
            <PopupError message={error} onClose={() => setShowPopup(false)} />
          )}
          {/* BarChart */}
          {data && (
            <BarChart
              data={chartData}
              title={`Biểu đồ phân bố điểm môn ${data.data.subject}`}
            />
          )}
        </div>
      </div>
      {/* Bảng Top 10 học sinh theo khối */}
      {/* Tiêu đề cho chức năng top 10 học sinh theo khối */}
      <h2 className="text-xl font-bold mb-4 text-blue-700 mt-12">Top 10 học sinh theo khối</h2>
      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-8xl border rounded-lg shadow p-6 bg-white">
          <div className="mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label className="font-semibold">Chọn khối:</label>
            <select
              value={block}
              onChange={handleBlockChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="A">A</option>
              <option value="A1">A1</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          {topBlockLoading && <PopupLoading message="Đang tải top 10 học sinh..." />}
          {topBlockError && <PopupError message={topBlockError} onClose={() => {}} />}
          {topBlockData && <TopBlockTable students={topBlockData} />}
        </div>
      </div>
    </div>
  );
};

export default Reports; 