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
      <div className="bg-[#3D3D4E1F] px-4 py-2 rounded-3xl group-hover:bg-[#3D3D4E] inline-flex items-center gap-1.5 text-[13px] text-[#3D3D4E] group-hover:text-white transition-colors duration-200">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 19.25C4.89953 19.25 0.75 15.1008 0.75 10C0.75 4.89916 4.89953 0.75 10 0.75C15.1005 0.75 19.25 4.89916 19.25 10C19.25 15.1008 15.1005 19.25 10 19.25ZM10 18.0508C14.4392 18.0508 18.0508 14.4392 18.0508 10C18.0508 5.56083 14.4392 1.94922 10 1.94922C5.56083 1.94922 1.94922 5.56083 1.94922 10C1.94922 14.4392 5.56083 18.0508 10 18.0508Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M7.68884 10.6621C7.35745 10.662 7.08923 10.3933 7.08923 10.0625C7.08928 9.73179 7.35748 9.46304 7.68884 9.46289H12.6986C13.0301 9.46289 13.2982 9.7317 13.2982 10.0625C13.2982 10.3933 13.0301 10.6621 12.6986 10.6621H7.68884Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M9.56342 12.6758C9.3003 12.8792 8.9238 12.8279 8.7226 12.5674L7.06927 10.4268L7.01361 10.3408C6.90256 10.1309 6.92515 9.87076 7.07904 9.68164L8.92767 7.41699C9.04579 7.27116 9.21846 7.19541 9.39154 7.19531C9.52503 7.19531 9.65975 7.24021 9.77045 7.33008C10.0278 7.53963 10.0653 7.91763 9.85638 8.17383L8.30951 10.0713L9.67181 11.835C9.87399 12.0969 9.82585 12.4733 9.56342 12.6758Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
        <span className={animated ? "translate-x-2 group-hover:translate-x-0 transition-all duration-300" : ""}>
          Back
        </span>
      </div>
    </button>
  );
};

export default BackButton;
