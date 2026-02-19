import { useState, useCallback, useEffect } from "react";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SocialFloat from "../SocialFloat";
import DolphinMascot from "../DolphinMascot";
import { useScrollProgress } from "@/hooks/useScrollAnimation";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  useScrollProgress();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <div id="scroll-progress" className="scroll-progress" />
      {/* On home page, header visibility is driven by hero scroll events */}
      <Header alwaysVisible={!isHome} />
      <main>{children}</main>
      <Footer />
      <SocialFloat />
      <DolphinMascot />
    </>
  );
}
