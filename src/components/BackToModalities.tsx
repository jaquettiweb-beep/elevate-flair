import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BackToModalities() {
  return (
    <Link
      to="/#modalidades"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-secondary border border-secondary/40 bg-secondary/10 backdrop-blur-md hover:bg-secondary/20 transition-colors mb-8"
    >
      <ArrowLeft className="w-4 h-4" />
      Voltar às Modalidades
    </Link>
  );
}
