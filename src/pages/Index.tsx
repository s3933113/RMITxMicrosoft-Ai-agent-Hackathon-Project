
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResumeUploader from "@/components/ResumeUploader";
import JobDescription from "@/components/JobDescription";
import ResultsDisplay from "@/components/ResultsDisplay";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Button } from "@/components/ui/button";
import { FileSparkles } from "@/components/FileSparklesIcon";
import { ArrowRight, RefreshCw } from "lucide-react";
import { 
  extractTextFromPDF, 
  analyzeResumeMatch 
} from "@/utils/openaiUtils";
import type { MatchResult } from "@/components/ResultsDisplay";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<MatchResult | null>(null);
  const { toast } = useToast();

  const handleFileUploaded = (uploadedFile: File) => {
    setFile(uploadedFile);
    setResults(null);
  };

  const handleJobDescChange = (text: string) => {
    setJobDesc(text);
    setResults(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No resume uploaded",
        description: "Please upload your resume first",
        variant: "destructive",
      });
      return;
    }

    if (!jobDesc.trim()) {
      toast({
        title: "Job description missing",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      setResults(null);
      
      // Extract text from the PDF file
      const resumeText = await extractTextFromPDF(file);
      
      // Analyze the resume against the job description
      const matchResults = await analyzeResumeMatch(resumeText, jobDesc);
      
      setResults(matchResults);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDesc("");
    setResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-5xl px-4 py-8">
        {!results ? (
          <div className="mb-8">
            <div className="text-center mb-10">
              <div className="inline-block p-4 bg-custom-purple-light dark:bg-custom-purple-dark rounded-full mb-4">
                <FileSparkles className="h-12 w-12 text-custom-purple dark:text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Resume Match Magic Wand
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your resume and paste a job description to see how well you match!
                Get instant feedback and suggestions to improve your application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ResumeUploader onFileUploaded={handleFileUploaded} />
              <JobDescription onChange={handleJobDescChange} disabled={isAnalyzing} />
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={!file || !jobDesc.trim() || isAnalyzing}
                className="cute-button flex items-center"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Match
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <ResultsDisplay results={results} />
            <div className="mt-8 flex justify-center">
              <Button onClick={handleReset} className="cute-button">
                Start New Analysis
              </Button>
            </div>
          </div>
        )}

        {isAnalyzing && <LoadingAnimation />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
