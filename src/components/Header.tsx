import { Dna } from "lucide-react";
import SocialIconButton from "./ui/SocialIconButton";
import linkedinIcon from "../assets/icons8-linkedin.svg";

export default function Header() {
  const socialMedia: { name: string; url: string; iconUrl: string }[] = [
    {
      name: "GitHub",
      url: "https://www.linkedin.com/in/jpbiondo",
      iconUrl: "https://cdn.simpleicons.org/github/ffffff",
    },
    {
      name: "X",
      url: "https://x.com/caaylow",
      iconUrl: "https://cdn.simpleicons.org/x/ffffff",
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/jpbiondo",
      iconUrl: linkedinIcon,
    },
  ];

  return (
    <header className="text-center">
      <div>
        <Dna className="mx-auto w-12 h-12 mb-2" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Mutant DNA Detector</h1>
      <p className="text-gray-600">
        Analyze DNA sequences to identify mutant patterns
      </p>

      <nav className="mt-6 flex gap-2 justify-center">
        {socialMedia.map((social) => (
          <SocialIconButton url={social.url}>
            <img
              src={social.iconUrl}
              alt={`${social.name} Icon`}
              className="w-6 h-6"
            />
            <span>{social.name}</span>
          </SocialIconButton>
        ))}
      </nav>
    </header>
  );
}
