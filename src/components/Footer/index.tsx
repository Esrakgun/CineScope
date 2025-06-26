import * as React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer
      className="py-6 mt-20 text-yellow-400"
      style={{
        background:
          "linear-gradient(90deg, #1f2937 0%, #111827 50%, #000000 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        <nav className="flex space-x-6 text-yellow-400">
          <a
            href="https://github.com/Esrakgun?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-yellow-300 transition transform hover:scale-110 hover:shadow-[0_0_8px_rgba(255,223,0,0.8),0_0_12px_rgba(255,255,255,0.6)]"
          >
            <FaGithub size={24} />
          </a>

          <span
            aria-label="Instagram"
            className="cursor-default hover:text-yellow-300 transition transform hover:scale-110 hover:shadow-[0_0_8px_rgba(255,223,0,0.8),0_0_12px_rgba(255,255,255,0.6)]"
          >
            <FaInstagram size={24} />
          </span>

          <a
            href="https://www.linkedin.com/in/esraakg%C3%BCndo%C4%9Fdu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-yellow-300 transition transform hover:scale-110 hover:shadow-[0_0_8px_rgba(255,223,0,0.8),0_0_12px_rgba(255,255,255,0.6)]"
          >
            <FaLinkedin size={24} />
          </a>
        </nav>

        <p className="text-sm md:text-base">
          © 2025 Tüm hakları saklıdır. Bu site <strong>Esra Akgündoğdu</strong>{" "}
          tarafından geliştirilmiştir.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
