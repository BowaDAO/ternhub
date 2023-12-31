import { RotatingLines } from "react-loader-spinner";

const RotatingLinesLoader = () => {
  return (
    <div className="h-screen flex items-start justify-center mt-10">
      <RotatingLines
        visible={true}
        width="50"
        strokeColor="#5627FF"
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
};

export default RotatingLinesLoader;
