"use client";

import { useState } from "react";
import { navbar } from "@/data";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Clients from "@/components/Certs";

import TechStack from "@/components/TechStack";
import RecentProjects from "@/components/RecentProjects";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

// Dynamically import Grid with SSR disabled
const Grid = dynamic(() => import("@/components/About"), { ssr: false });

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-black flex flex-col">
      {/* ===== NAVBAR ===== */}
      <Navbar className="top-0">
        {/* Desktop Navbar */}
        <NavBody className="bg-slate-600/30 backdrop-blur-md ">
          <NavbarLogo />
          <NavItems
            items={navbar}
            onItemClick={() => console.log("menu clicked")}
          />
          <NavbarButton
            href="https://mail.google.com/mail/u/0/?view=cm&tf=1&fs=1&to=dimasbudi328@gmail.com"
            variant="primary"
            className="items-end"
          >
            Send Email
          </NavbarButton>
        </NavBody>

        {/* Mobile Navbar */}
        <MobileNav>
          <MobileNavHeader>
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <NavItems
              items={navbar}
              className="flex flex-col space-y-4"
              onItemClick={() => setIsOpen(false)}
            />
            <NavbarButton
              href="https://mail.google.com/mail/u/0/?view=cm&tf=1&fs=1&to=dimasbudi328@gmail.com"
              variant="primary"
              className="items-end"
            >
              Send Email
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* ===== HERO SECTION ===== */}
      <Hero />

      {/* ===== KONTEN LAIN ===== */}
      <div className="relative z-10 max-w-7xl w-full sm:px-10 px-5 space-y-32 overflow-hidden">
        <Grid />
        <TechStack />
        <RecentProjects />
        <Clients />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
