import LoadingBar from "./LoadingBar";

const LoadingPage: React.FC = () => {
  return (
    <div className="mockup-window border bg-base-300 border m-4">


      <div className="flex flex-col items-center justify-center h-screen">
        <LoadingBar />
      </div>

    </div>
  );
};

export default LoadingPage;