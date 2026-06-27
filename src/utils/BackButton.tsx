import { useNavigate } from "react-router-dom";

const BackButton = ({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className={`group flex ${className ?? ""}`}>
      <div className="bg-[#3D3D4E1F] px-4 py-2 rounded-3xl group-hover:bg-[#3D3D4E] inline-flex items-center gap-1.5 text-[13px] text-[#3D3D4E] hover:text-white transition-colors">
        <div className="flex justify-center items-center border-2 font-bold border-[#3D3D4E] group-hover:border-white rounded-full w-6 h-6">
          ←
        </div>
        <span className={animated ? "translate-x-2 group-hover:translate-x-0 transition-all duration-300" : ""}>
          Back
        </span>
      </div>
    </button>
  );
};

export default BackButton;
