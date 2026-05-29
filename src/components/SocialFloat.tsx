import { Instagram, Facebook, Linkedin, Youtube, Phone } from "lucide-react";

const SOCIALS = [
  { icon: Instagram, href: "https://www.instagram.com/academia.flipper/", bg: "bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(30,90%,55%)]", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@academiaflipper", bg: "bg-[hsl(0,100%,42%)]", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/academia-flipper/", bg: "bg-[hsl(201,100%,35%)]", label: "LinkedIn" },
  {
    icon: Phone,
    href: "https://api.whatsapp.com/send?phone=5511944440557&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Flipper%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre...",
    bg: "bg-[hsl(142,70%,40%)]",
    label: "WhatsApp",
  },
];

export default function SocialFloat() {
  return (
    <aside className="social-float hidden lg:flex" aria-label="Redes sociais">
      {SOCIALS.map(({ icon: Icon, href, bg, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-float-item ${bg}`}
          aria-label={label}
        >
          <Icon size={20} />
        </a>
      ))}
    </aside>
  );
}
