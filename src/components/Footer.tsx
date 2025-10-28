
import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="text-center text-sm text-muted-foreground flex items-center justify-center">
        <span>Alongkorn Sirimuntanakul</span>
        <span>&copy; {new Date().getFullYear()} ResuMatch</span>
      </div>
    </footer>
  );
};

export default Footer;
