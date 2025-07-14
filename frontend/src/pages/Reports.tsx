import React from 'react';
import Card from '../components/UI/Card';

const Reports: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">
          Reports
        </h2>
        <p className="text-gray-600">View your reports here.</p>
      </Card>
    </div>
  );
};

export default Reports; 