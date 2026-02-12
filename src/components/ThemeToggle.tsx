
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  isLightHeader?: boolean;
}

export const ThemeToggle = ({ isLightHeader = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={
        isLightHeader
          ? "rounded-full w-10 h-10 bg-white/20 hover:bg-white/30 text-white"
          : "rounded-full w-10 h-10 bg-atlassian-blue-light dark:bg-atlassian-blue-dark"
      }
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-custom-yellow transition-all" />
      ) : (
        <Moon className={`h-5 w-5 transition-all ${isLightHeader ? "text-white" : "text-atlassian-blue"}`} />
      )}
    </Button>
  );
};

export default ThemeToggle;
