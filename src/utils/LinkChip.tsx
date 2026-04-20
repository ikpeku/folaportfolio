import React from "react";

export const LinkChip: React.FC<{ icon: React.ReactNode; label: string; href?: string }> = ({ icon, label, href = "#" }) => {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className="group inline-flex items-center gap-1.5 rounded-3xl bg-[#F3F4F6] hover:bg-[#3D3D4E] transition-colors px-3 py-2 text-[14px] font-semibold text-[#3D3D4E] hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};
