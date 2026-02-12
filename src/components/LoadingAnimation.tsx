
import React from "react";
import { FileText, Briefcase, ArrowRight } from "lucide-react";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="flex items-center space-x-4">
        <div className="animate-bounce-small">
          <FileText className="h-12 w-12 text-custom-blue" />
        </div>
        <ArrowRight className="h-8 w-8 text-atlassian-blue animate-pulse-soft" />
        <div className="animate-bounce-small" style={{ animationDelay: "0.5s" }}>
          <Briefcase className="h-12 w-12 text-custom-peach" />
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <div className="bg-atlassian-blue-light dark:bg-atlassian-blue-dark h-2 w-48 rounded-full overflow-hidden">
          <div className="bg-atlassian-blue h-full w-full animate-pulse-soft"></div>
        </div>
        <p className="mt-3 text-muted-foreground">Analyzing your resume...</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
