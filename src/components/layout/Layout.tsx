import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SocialFloat from "../SocialFloat";
import DolphinMascot from "../DolphinMascot";
import { useScrollProgress } from "@/hooks/useScrollAnimation";

export default function Layout({ children }: { children: ReactNode }) {
  useScrollProgress();

  return (
    <>
      <div id="scroll-progress" className="scroll-progress" />
      <Header />
      <main>{children}</main>
      <Footer />
      <SocialFloat />
      <DolphinMascot />
    </>
  );
}
