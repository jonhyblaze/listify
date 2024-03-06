const Loading = () => {
  return (
    <div className="flex h-screen flex-col justify-center">
      <h4 className="m-auto inline-flex items-center gap-4 text-2xl text-white">
        Loading
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-t-2 border-gray-300 border-opacity-100"></span>
      </h4>
    </div>
  );
};

export default Loading;
