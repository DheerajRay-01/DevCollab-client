import React from 'react';
import { useParams, useNavigate } from 'react-router';

function Analytics() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-gray-800">🚧 Analytics Under Development 🚧</h1>
      <p className="text-lg text-gray-600 mt-2">
        Analytics for post ID: {id}
      </p>
      <button 
        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        onClick={() => navigate(-1)}
      >
        Go Back To Post
      </button>
    </div>
  );
}

export default Analytics;
