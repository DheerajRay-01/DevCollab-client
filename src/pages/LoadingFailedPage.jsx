import { FaExclamationTriangle } from 'react-icons/fa'; // Font Awesome Exclamation Icon

const LoadingFailedPage = ({ loading }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Website Title */}
      <div className="absolute top-8 text-3xl font-semibold text-center text-gray-200 tracking-wider">
        <h1>DevCollab</h1> {/* Your Website Name */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center bg-gray-700 px-8 py-10 rounded-lg shadow-xl border border-gray-600 w-96">
        {/* Warning Icon */}
        <div className="w-20 h-20 flex items-center justify-center bg-red-600 rounded-full mb-6">
          <FaExclamationTriangle className="w-12 h-12 text-white" />
        </div>

        {/* Error Message */}
        <p className="mt-4 text-red-400 text-xl font-semibold">Loading Failed</p>
        <p className="text-gray-300 text-sm text-center mt-2">
          Something went wrong while fetching data from the server. Please try again.
        </p>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()} // Reload the page as a retry mechanism
          className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-lg transition duration-300"
        >
          {loading ? 'Retrying...' : 'Retry'}
        </button>
      </div>
    </div>
  );
};

export default LoadingFailedPage;
