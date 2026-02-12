
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { FileSparkles } from "./FileSparklesIcon";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center animate-fade-in">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        <FileSparkles className="h-8 w-8 text-atlassian-blue" />
        <h1 className="text-xl md:text-2xl font-bold text-atlassian-blue dark:text-atlassian-blue-light">
          ResuMatch
        </h1>
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;
