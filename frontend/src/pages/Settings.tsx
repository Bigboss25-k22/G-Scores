import React from 'react';
import Card from '../components/UI/Card';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6">
      <Card>
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">
          Settings
        </h2>
        <p className="text-gray-600">Configure your application settings.</p>
      </Card>
    </div>
  );
};

export default Settings; 