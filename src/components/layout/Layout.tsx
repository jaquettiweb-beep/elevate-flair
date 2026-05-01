import { ReactNode } from "react";
import { Header } from "@/components/ui/header-3";
import Footer from "./Footer";
import SocialFloat from "../SocialFloat";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {/* On home page, header visibility is driven by hero scroll events */}
      <Header alwaysVisible={!isHome} />
      <main>{children}</main>
      <Footer />
      <SocialFloat />
    </>
  );
}
