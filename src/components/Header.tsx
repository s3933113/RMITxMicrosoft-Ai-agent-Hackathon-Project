
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { FileSparkles } from "./FileSparklesIcon";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-2">
        <FileSparkles className="h-8 w-8 text-custom-purple" />
        <h1 className="text-xl md:text-2xl font-bold text-custom-purple dark:text-custom-purple-light">
          ResuMatch
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
