"use client";

import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { FlipWords } from "./ui/FlipWord";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import DarkVeil from "./ui/darkveil";
import ProfileCard from "./ProfileCard";

const Hero = () => {
  const words = [
    "Mahasiswa",
    "Developer",
    "CyberSecurity Enthusiast",
    "Tech Explorer",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pb-20 pt-28 overflow-visible">
      <div className="absolute inset-0">
        {/* Layer 1: Grid Background */}
        <div
          className="h-screen w-full dark:bg-black-100 bg-white 
        dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0"
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white
            [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] [-webkit-mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>

        {/* Layer 2: DarkVeil with same mask */}
        <div
          className="absolute inset-0 h-full w-full top-0 left-0
        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] 
        [-webkit-mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        >
          <DarkVeil />
        </div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center over">
        {/* Left: About Text */}
        <div className="flex flex-col px-6 items-center md:items-start text-center md:text-left">
          {/* Title with FlipWords + TextGenerateEffect */}
          <h1 className="text-[22px] md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-5 leading-snug">
            <TextGenerateEffect
              words="Halo saya Dimas, seorang "
              className="inline"
            />
            <span className="text-blue-500 flex justify-center md:justify-start">
              <FlipWords words={words} />
            </span>
          </h1>
          <div>
            <h2 className=" tracking-widest text-xs text-white-100 mt-6">
              Short Desc
            </h2>
            <TextGenerateEffect
              words="Mahasiswa Sistem Informasi yang senang mengeksplorasi dunia pengembangan aplikasi, cybersecurity, dan teknologi digital. Selalu termotivasi untuk belajar hal baru dan mengembangkan ide menjadi proyek nyata."
              className=" text-sm md:text-base text-white-100 mb-4"
            />
          </div>
          <a href="#project">
            <MagicButton
              title="Lihat Proyek Saya"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>

        {/* Right: Photo Card */}
        <div className="flex justify-center pb-20">
          <ProfileCard
            className="w-64 h-96"
            name="Dimas Rhoyhan B.S"
            title="Information Systems Student"
            handle="dimas_budi"
            status="Online"
            contactText="Contact Me"
            avatarUrl="profile.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() =>
              (window.location.href = "https://www.instagram.com/dimas_budi7")
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
