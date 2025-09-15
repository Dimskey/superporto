import React from "react";
import CardSwap, { Card } from "./ui/CardSwap";
import FeatureCard from "./ui/FeatureCard";
import { FaLinux, FaDatabase, FaMagic, FaServer } from "react-icons/fa";
import { SparklesCore } from "./ui/sparkles";

const TechStack = () => {
  return (
    <section id="techstack" className="relative w-full py-12">
      {/* ===== Layer Background Sparkle ===== */}
      <div className="absolute inset-0">
        <div className="h-full w-full absolute top-0 left-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center
            dark:bg-black bg-white
            [mask-image:linear-gradient(to_bottom,black_0%,transparent_20%,transparent_80%,black_100%)]
            [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_20%,transparent_80%,black_100%)]"
          />
        </div>
      </div>
      <div className="container mx-auto px-6">
        {/* === Desktop (≥lg): kiri teks, kanan card === */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Kiri */}
          <div className="space-y-6 pr-8">
            <h1 className="pt-4 text-3xl font-bold text-white lg:text-4xl">
              My Awesome <span className="text-purple">Tech Stack</span>
            </h1>
            <p className="max-w-md text-lg text-gray-300">
              Here's a snapshot of the technologies and tools I excel in.
            </p>
          </div>

          {/* Kanan - dengan overflow hidden untuk mencegah animasi keluar */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-[420px]">
              <CardSwap
                width={500}
                height={350}
                cardDistance={40}
                verticalDistance={50}
              >
                <Card>
                  <FeatureCard title="Frontend" icon={FaMagic} image="fe.png" />
                </Card>
                <Card>
                  <FeatureCard
                    title="Backend"
                    icon={FaDatabase}
                    image="/backend.png"
                  />
                </Card>
                <Card>
                  <FeatureCard
                    title="DevOps"
                    icon={FaServer}
                    image="/devops.png"
                  />
                </Card>
                <Card>
                  <FeatureCard
                    title="Cybersecurity"
                    icon={FaLinux}
                    image="/cyber.png"
                  />
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>

        {/* === Mobile & Tablet (<lg): Stack vertikal === */}
        <div className="flex flex-col items-center gap-12 lg:hidden">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              My Awesome <span className="text-purple">Tech Stack</span>
            </h1>
            <p className="mx-auto max-w-sm text-base text-gray-300">
              Here's a snapshot of the technologies and tools I excel in.
            </p>
          </div>

          <div className="flex justify-center w-full mb-12 lg:mt-0">
            <div className="relative w-full max-w-md h-[430px]">
              <CardSwap
                width="100%"
                height={350}
                cardDistance={40}
                verticalDistance={50}
                containerClassName="relative flex justify-center items-center"
              >
                <Card>
                  <FeatureCard
                    title="Frontend"
                    icon={FaMagic}
                    image="/fe.png"
                  />
                </Card>
                <Card>
                  <FeatureCard
                    title="Backend"
                    icon={FaDatabase}
                    image="/backend.png"
                  />
                </Card>
                <Card>
                  <FeatureCard
                    title="DevOps"
                    icon={FaServer}
                    image="/devops.png"
                  />
                </Card>
                <Card>
                  <FeatureCard
                    title="Cybersecurity"
                    icon={FaLinux}
                    image="/cyber.png"
                  />
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
