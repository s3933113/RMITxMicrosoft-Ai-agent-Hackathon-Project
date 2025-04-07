
import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="text-center text-sm text-muted-foreground flex items-center justify-center">
        <span>Made with</span>
        <Heart className="h-4 w-4 mx-1 text-custom-peach" fill="#FEC6A1" />
        <span>&copy; {new Date().getFullYear()} ResuMatch</span>
      </div>
    </footer>
  );
};

export default Footer;
