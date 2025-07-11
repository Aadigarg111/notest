import React from 'react';
import api from '../services/api';

const SettingsPage: React.FC = () => {
  // Example: You can use api.get('/api/health') here for future integration
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="card">
        <p className="text-gray-300">Settings interface coming soon...</p>
      </div>
    </div>
  );
};

export default SettingsPage; 