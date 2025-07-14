import React from 'react';

interface BarChartProps {
  data: { score: number; count: number; level: string }[];
  title: string;
}

const levelColors: Record<string, string> = {
  'Yếu': 'bg-red-500',
  'Trung bình': 'bg-yellow-400',
  'Khá': 'bg-blue-500',
  'Giỏi': 'bg-green-500',
};

export const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  const maxBarHeight = 320;
  const minBarHeight = 2;
  // Không giới hạn minWidth, barWidth, để biểu đồ tự động co giãn
  const barWidth = 24;

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-center mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <div
          className="flex items-end justify-center gap-1 w-full"
          style={{ minWidth: `${data.length * 22}px` }}
        >
          {data.map((d, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[20px]">
              <span className="mb-1 text-[10px] font-semibold text-gray-700 select-none">{d.count > 0 ? d.count : ''}</span>
              <div
                className={`${levelColors[d.level] || 'bg-gray-300'} rounded-t transition-all`}
                style={{
                  width: 18,
                  height: d.count > 0
                    ? Math.max((d.count / maxCount) * maxBarHeight, minBarHeight)
                    : minBarHeight
                }}
                title={`${d.count} học sinh`}
              />
              <span className="mt-2 text-[10px] font-medium select-none">{d.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 