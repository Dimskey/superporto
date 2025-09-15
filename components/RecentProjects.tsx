"use client";

import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <section id="project" className="py-20 relative">
      <div>
        {/* Background dengan gradient */}
        <div className="absolute inset-0">
          <div
            className="h-full w-full absolute top-0 left-0
          dark:bg-black bg-white
          [mask-image:linear-gradient(to_bottom,black_0%,transparent_10%,transparent_70%,black_100%)]
          [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_20%,transparent_80%,black_100%)]"
          />
        </div>

        {/* Content dengan z-index */}
        <div className="relative z-10">
          <h1 className="heading">
            A small selection of{" "}
            <span className="text-purple">recent projects</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
            {projects.map((item) => (
              <div
                key={item.id}
                className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
              >
                <PinContainer title={item.title} href={item.link}>
                  <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                    <div
                      className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <img
                        src="/bg.png"
                        alt="bgimg"
                        className="pointer-events-none"
                      />
                    </div>
                    <img
                      src={item.img}
                      alt="cover"
                      className="z-10 absolute bottom-0 pointer-events-none"
                    />
                  </div>

                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                    {item.title}
                  </h1>
                  <p
                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                    style={{ color: "#BEC1DD", margin: "1vh 0" }}
                  >
                    {item.des}
                  </p>

                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center">
                      {item.iconLists.map((icon, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                          style={{
                            transform: `translateX(-${5 * index + 2}px)`,
                          }}
                        >
                          <img
                            src={icon}
                            alt="icon"
                            className="p-2 pointer-events-none"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                        Check Live Site
                      </p>
                      <FaLocationArrow className="ms-3" color="#CBACF9" />
                    </div>
                  </div>
                </PinContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
