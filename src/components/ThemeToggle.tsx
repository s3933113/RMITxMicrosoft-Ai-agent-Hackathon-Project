
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 bg-atlassian-blue-light dark:bg-atlassian-blue-dark"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-custom-yellow transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-atlassian-blue transition-all" />
      )}
    </Button>
  );
};

export default ThemeToggle;
