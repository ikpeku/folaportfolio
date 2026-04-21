import Assets from "../assets";
import { LinkChip } from "../utils/LinkChip";

const Footer = ({ reversed = false, isDetail = false, onClick, description }: {description?: string, reversed?: boolean, isDetail?: boolean, onClick?: () => void }) => (
  <footer className={`mt-24 pt-12 border-t border-dashed border-[#B1B1B8] flex flex-col lg:flex-row lg:items-end ${reversed ? "flex-row-reverse" : ""}`}>



    {isDetail && <div className="flex-1 ">

      <button onClick={onClick} className="group mb-6 ">
        <div className="bg-[#3D3D4E1F] px-4 py-2 rounded-3xl group-hover:bg-[#3D3D4E] inline-flex items-center gap-1.5 text-[13px] text-[#3D3D4E] hover:text-white transition-colors">
          <span className="-translate-x-2 group-hover:translate-x-0 transition-all duration-300">Next Project</span>
          <div className="flex justify-center items-center border-2 font-bold border-[#3D3D4E] group-hover:border-white rounded-full w-6 h-6">→</div>
        </div>
      </button>
      <p className="font-semibold text-[20px] lg:max-w-xl">{description}</p>
      <img src={Assets.Logo} alt="Folarin Lawal" className="h-8 w-auto mt-28 mb-8 hidden lg:block" />

    </div>}


    <div className="flex justify-end my-8 lg:my-0 lg:justify-center ">
      <img
        src={Assets.Footerbannershot}
        alt="Footer banner"
        className="w-1/3 lg:w-full max-h-112.75 max-w-sm md:max-w-full rounded-xl object-contain"
      />
    </div>



    {!isDetail && <div className={`my-10 flex flex-wrap  items-center gap-4 flex-1 ${reversed ? "justify-start" : "justify-end"}`}>
      <LinkChip icon={<Assets.ResumeIcon />} label="Resume" href="https://drive.google.com/file/d/1rtFla6HYYecrwvXsFqgdXbHrvFb1B-Ni/view" />
      <LinkChip icon={<Assets.LinkedInIcon />} label="LinkedIn" href="https://www.linkedin.com/in/folarin-lawal/" />
      <LinkChip icon={<Assets.EmailIcon />} label="Email" href="mailto:lawal.folarin@gmail.com" />
      <img src={Assets.Logo} alt="Folarin Lawal" className="h-8 w-auto" />
    </div>
    }

<div>
     <img src={Assets.Logo} alt="Folarin Lawal" className="h-8 w-auto mb-8  lg:hidden" />
</div>


  </footer>
);


export default Footer;
