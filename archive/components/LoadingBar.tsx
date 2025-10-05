const LoadingBar: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <span className="loading loading-infinity loading-xs"></span>
      <span className="loading loading-infinity loading-sm"></span>
      <span className="loading loading-infinity loading-md"></span>
      <span className="loading loading-infinity loading-lg"></span>
      <span className="loading loading-infinity loading-md"></span>
      <span className="loading loading-infinity loading-sm"></span>
      <span className="loading loading-infinity loading-xs"></span>
    </div>
  );
};

export default LoadingBar;