
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

interface UseFileUploadReturn {
  file: File | null;
  fileUrl: string | null;
  fileName: string;
  isOver: boolean;
  clearFile: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useFileUpload = (
  acceptedFileTypes: string[] = ["application/pdf"]
): UseFileUploadReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isOver, setIsOver] = useState<boolean>(false);

  const validateFile = (file: File): boolean => {
    if (!acceptedFileTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    setFile(file);
    setFileName(file.name);
    setFileUrl(URL.createObjectURL(file));
    toast({
      title: "File uploaded successfully",
      description: `"${file.name}" is ready for analysis`,
    });
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOver(false);

      const droppedFile = e.dataTransfer.files[0];
      if (!droppedFile) return;

      processFile(droppedFile);
    },
    [acceptedFileTypes]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      processFile(selectedFile);
    },
    [acceptedFileTypes]
  );

  const clearFile = useCallback(() => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(null);
    setFileUrl(null);
    setFileName("");
  }, [fileUrl]);

  return {
    file,
    fileUrl,
    fileName,
    isOver,
    clearFile,
    onDragOver,
    onDragLeave,
    onDrop,
    onFileChange,
  };
};

export default useFileUpload;
