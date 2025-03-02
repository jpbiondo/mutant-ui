import { Dna } from "lucide-react";
import SocialIconButton from "./components/ui/SocialIconButton";

function App() {
  const socialMedia = {
    linkedin: "https://www.linkedin.com/in/jpbiondo",
    github: "https://github.com/jpbiondo/",
    twitter: "https://x.com/caaylow",
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="text-center">
        <div>
          <Dna className="mx-auto w-12 h-12 mb-2" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Mutant DNA Detector
        </h1>
        <p className="text-gray-700">
          Analyze DNA sequences to identify mutant patterns
        </p>

        <nav className="mt-6 flex gap-2 justify-center">
          <SocialIconButton url={socialMedia.github}>
            <img
              src="https://cdn.simpleicons.org/github/ffffff"
              alt="GitHub Icon"
              className="w-6 h-6"
            />
            <span>GitHub</span>
          </SocialIconButton>

          <SocialIconButton url={socialMedia.twitter}>
            <img
              src="https://cdn.simpleicons.org/x/ffffff"
              alt="Linkedin Icon"
              className="w-6 h-6"
            />
            <span>X</span>
          </SocialIconButton>

          <SocialIconButton url={socialMedia.twitter}>
            <img
              src="https://cdn.simpleicons.org/x/ffffff"
              alt="Linkedin Icon"
              className="w-6 h-6"
            />
            <span>X</span>
          </SocialIconButton>
        </nav>
      </header>

      <button className="btn btn-primary">Primary</button>
    </div>
  );
}

export default App;
