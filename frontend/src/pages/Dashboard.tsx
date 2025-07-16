import React from 'react';
import Card from '../components/UI/Card';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6">
      <Card>
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">
          Dashboard
        </h2>
        <p className="text-gray-600">Welcome to your dashboard!</p>
      </Card>
    </div>
  );
};

export default Dashboard; 