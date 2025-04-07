
import { MatchResult } from "@/components/ResultsDisplay";
import OpenAI from "openai";
// Set the worker source
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// Import as a string URL, not a Worker instance
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";


// Get API key from environment variable, with fallback to empty string
const apiKey = import.meta.env.VITE_OPENAI_API_KEY || "";

// Initialize OpenAI client with the API key
const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true // Allow API usage in browser
});

/**
 * Extracts text content from a PDF file
 * @param file PDF file
 * @returns Promise resolving to text content
 */
// Set the worker source URL
GlobalWorkerOptions.workerSrc = workerUrl;
export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    text += strings.join(" ") + "\n";
  }

  return text.trim();
};



/**
 * Analyzes the resume against a job description using OpenAI
 * @param resumeText The text content of the resume
 * @param jobDescription The job description to match against
 * @returns Promise resolving to match results
 */
export const analyzeResumeMatch = async (
  resumeText: string,
  jobDescription: string
): Promise<MatchResult> => {
  try {
    console.log("Analyzing resume match with OpenAI...");
    
    // Check if API key is available
    if (!apiKey) {
      console.error("OpenAI API key is missing. Please set the VITE_OPENAI_API_KEY environment variable.");
      throw new Error("OpenAI API key is missing");
    }
    
    const prompt = `
      You are an expert resume analyzer. Compare the following resume to the job description and provide:
      1. An overall match percentage (as a number between 0-100)
      2. A list of skills mentioned in the resume that match the job description
      3. A list of skills from the job description that are missing from the resume
      4. Specific suggestions for improving the resume to better match this job description
      
      Resume:
      ${resumeText}
      
      Job Description:
      ${jobDescription}
      
      Format your response as a JSON object with the following structure:
      {
        "matchPercentage": number,
        "matchedSkills": string[],
        "missingSkills": string[],
        "suggestions": string[]
      }
    `;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a resume analysis expert that provides structured JSON responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      response_format: { type: "json_object" }
    });
    
    // Extract the content from the response
    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content received from OpenAI");
    }
    
    // Parse the JSON response
    const result = JSON.parse(content) as MatchResult;
    
    return result;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    
    // Fallback to mock data if OpenAI call fails
    const matchPercentage = Math.floor(Math.random() * 40) + 60; // Random between 60-99%
    
    const fallbackResult: MatchResult = {
      matchPercentage,
      missingSkills: [
        "Node.js",
        "Express",
        "MongoDB",
        "CI/CD",
      ],
      matchedSkills: [
        "JavaScript",
        "React",
        "TypeScript",
        "UI/UX Design",
        "Responsive Development",
      ],
      suggestions: [
        "Highlight your experience with frontend frameworks more prominently",
        "Add specific metrics or achievements to quantify your impact",
        "Consider adding a skills section that clearly lists your technical proficiencies",
        "Tailor your resume more specifically to this role by emphasizing relevant projects",
      ],
    };
    
    return fallbackResult;
  }
};
