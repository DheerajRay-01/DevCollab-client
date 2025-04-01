const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 animate-spin">
          <div className="w-24 h-24 border-8 border-transparent border-t-green-500 border-l-green-500 rounded-full"></div>
        </div>
      </div>
      <p className="mt-6 text-green-400 text-2xl font-semibold font-mono animate-pulse">Loading DevCollab...</p>
      <p className="mt-2 text-gray-300 text-sm">Please wait while we gather the data for you.</p>
    </div>
  );
};

export default LoadingPage;
