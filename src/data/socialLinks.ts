import type { SocialLink } from "@/types/portfolio";

export const socialLinks: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@example.com",
    icon: { alt: "Email icon", fallback: "@", backgroundClass: "from-rose-400 to-red-700" },
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: { alt: "LinkedIn icon", fallback: "in", backgroundClass: "from-sky-400 to-blue-800" },
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: { alt: "Instagram icon", fallback: "◎", backgroundClass: "from-purple-500 via-pink-500 to-orange-400" },
  },
];
