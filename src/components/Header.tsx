
import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { FileSparkles } from "./FileSparklesIcon";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { pathname } = useLocation();
  const isFunctionPage = pathname === "/analyze";
  const hasValidKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== "YOUR_PUBLISHABLE_KEY";

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
      <div className="flex items-center gap-2">
        {hasValidKey ? (
          <>
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className={isFunctionPage ? "text-white hover:bg-white/20 h-9 px-3" : "h-9 px-3"}
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: isFunctionPage ? "border-2 border-white w-9 h-9" : "w-9 h-9",
                  },
                }}
              />
            </SignedIn>
          </>
        ) : null}
        <ThemeToggle isLightHeader={isFunctionPage} />
      </div>
    </header>
  );
};

export default Header;
