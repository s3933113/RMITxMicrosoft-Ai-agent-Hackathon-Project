
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";

interface JobDescriptionProps {
  onChange: (text: string) => void;
  disabled?: boolean;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ 
  onChange, 
  disabled = false 
}) => {
  const [description, setDescription] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    onChange(description);
  }, [description, onChange]);

  return (
    <div className="w-full">
      <div className="flex items-center mb-3">
        <Briefcase className="h-5 w-5 mr-2 text-atlassian-blue dark:text-atlassian-blue-light" />
        <h2 className="text-xl font-semibold text-atlassian-blue dark:text-atlassian-blue-light">
          Job Description
        </h2>
      </div>
      
      <Textarea
        placeholder="Paste the job description here..."
        className="cute-textarea min-h-[200px]"
        value={description}
        onChange={handleChange}
        disabled={disabled}
      />
      
      <p className="text-xs text-muted-foreground mt-2">
        The more detailed the job description, the more accurate the matching will be.
      </p>
    </div>
  );
};

export default JobDescription;
