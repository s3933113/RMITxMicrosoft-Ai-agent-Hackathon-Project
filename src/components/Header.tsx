
import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { FileSparkles } from "./FileSparklesIcon";

const Header = () => {
  const { pathname } = useLocation();
  const isFunctionPage = pathname === "/analyze";

  return (
    <header
      className={`w-full py-4 px-6 flex justify-between items-center animate-fade-in transition-colors ${
        isFunctionPage
          ? "bg-atlassian-blue text-white"
          : "bg-transparent"
      }`}
    >
      <Link
        to="/"
        className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${
          isFunctionPage ? "text-white" : ""
        }`}
      >
        <FileSparkles className={`h-8 w-8 ${isFunctionPage ? "text-white" : "text-atlassian-blue"}`} />
        <h1
          className={`text-xl md:text-2xl font-bold ${
            isFunctionPage ? "text-white" : "text-atlassian-blue dark:text-atlassian-blue-light"
          }`}
        >
          ResuMatch
        </h1>
      </Link>
      <ThemeToggle isLightHeader={isFunctionPage} />
    </header>
  );
};

export default Header;
