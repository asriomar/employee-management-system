import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [serverMessage, setServerMessage] = useState('Loading...');
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    // Test connection to backend
    const testConnection = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hello');
        setServerMessage(response.data.message);

        const health = await axios.get('http://localhost:5000/api/health');
        setServerStatus(health.data.status);
      } catch (error) {
        setServerMessage('❌ Cannot connect to server. Is it running?');
        setServerStatus('ERROR');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Employee Management
        </h1>
        <p className="text-gray-600 mb-6">System initialized successfully</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Client Status</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              ✅ React Running
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Server Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${serverStatus === 'OK'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
              }`}>
              {serverStatus === 'OK' ? '✅ Connected' : '❌ Disconnected'}
            </span>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800 font-medium">Server Message:</p>
            <p className="text-blue-600 mt-1">{serverMessage}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            MERN Stack • Tailwind CSS • Ready for Development
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;