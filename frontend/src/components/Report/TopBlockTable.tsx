import React from 'react';
import { TopBlockStudent } from '../../hooks/useTopBlock';

interface TopBlockTableProps {
  students: TopBlockStudent[];
}

const TopBlockTable: React.FC<TopBlockTableProps> = ({ students }) => {
  if (!students || students.length === 0) return <div className="text-center text-gray-500">Không có dữ liệu</div>;
  // Lấy danh sách môn từ học sinh đầu tiên
  const subjectNames = students[0].subjects.map(s => s.name);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border rounded-lg bg-white">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-3 py-2 border">STT</th>
            <th className="px-3 py-2 border">Số báo danh</th>
            <th className="px-3 py-2 border">Tổng điểm</th>
            {subjectNames.map((name) => (
              <th key={name} className="px-3 py-2 border">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s, idx) => (
            <tr key={s.regNumber} className="hover:bg-gray-50">
              <td className="px-3 py-2 border text-center">{idx + 1}</td>
              <td className="px-3 py-2 border text-center">{s.regNumber}</td>
              <td className="px-3 py-2 border text-center font-semibold">{s.totalScore.toFixed(2)}</td>
              {subjectNames.map((name) => {
                const subj = s.subjects.find(sub => sub.name === name);
                return <td key={name} className="px-3 py-2 border text-center">{subj ? subj.score.toFixed(1) : '-'}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopBlockTable; 