import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  const handleClick = (id: number) => {
    const info = socialMedia.find((item) => item.link && item.id === id);
    if (info?.link) {
      window.open(info.link, "_blank");
    }
  };
  return (
    <footer className="relative w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="absolute inset-0">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 object-cover"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Let&apos;s <span className="text-purple">team up</span> and create
          magic
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me on LinkedIn for collaborations, opportunities, or just
          to say hi!
        </p>
        <a href="https://www.linkedin.com/in/dimasrbs/">
          <MagicButton
            title="Let's get connect"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          © 2025 Dimas Budi — Released under the MIT License
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <button
              key={info.id}
              type="button"
              onClick={() => handleClick(info.id)}
              className="w-10 h-10 flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 cursor-pointer"
            >
              <Image src={info.img} alt="icons" width={20} height={20} />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
