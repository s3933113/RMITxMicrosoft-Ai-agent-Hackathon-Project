
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, FileText, X } from "lucide-react";
import useFileUpload from "@/hooks/useFileUpload";

interface ResumeUploaderProps {
  onFileUploaded: (file: File) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onFileUploaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    file,
    fileName,
    isOver,
    clearFile,
    onDragOver,
    onDragLeave,
    onDrop,
    onFileChange,
  } = useFileUpload(["application/pdf"]);

  React.useEffect(() => {
    if (file) {
      onFileUploaded(file);
    }
  }, [file, onFileUploaded]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3 text-custom-purple dark:text-custom-purple-light">
        Upload Your Resume
      </h2>
      
      {!file ? (
        <div
          className={`upload-zone ${isOver ? "upload-zone-active" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <FileUp className="h-12 w-12 mb-4 text-custom-purple dark:text-custom-purple-light" />
          <p className="text-lg mb-4">Drag & drop your resume PDF here</p>
          <p className="text-sm text-muted-foreground mb-4">
            or click the button below
          </p>
          <Button
            onClick={handleButtonClick}
            className="cute-button"
          >
            Browse Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="application/pdf"
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-6">
            Maximum file size: 5MB (PDF files only)
          </p>
        </div>
      ) : (
        <div className="cute-card">
          <div className="flex items-center">
            <FileText className="h-10 w-10 text-custom-purple" />
            <div className="ml-4 flex-1">
              <p className="font-medium">{fileName}</p>
              <p className="text-sm text-muted-foreground">
                Ready for analysis
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
              className="ml-2"
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
