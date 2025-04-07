
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, Star } from "lucide-react";

export interface MatchResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

interface ResultsDisplayProps {
  results: MatchResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { matchPercentage, matchedSkills, missingSkills, suggestions } = results;

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-custom-yellow-dark";
    return "text-custom-peach-dark";
  };

  const getMatchText = (percentage: number) => {
    if (percentage >= 80) return "Great match!";
    if (percentage >= 60) return "Good match";
    return "Needs improvement";
  };

  const getMatchEmoji = (percentage: number) => {
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    return "🔍";
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Your Resume Match Result {getMatchEmoji(matchPercentage)}
        </h2>
        <div className="flex justify-center items-center mb-2">
          <span className={`text-4xl font-bold ${getMatchColor(matchPercentage)}`}>
            {matchPercentage}%
          </span>
          <span className="ml-2 text-lg text-muted-foreground">
            {getMatchText(matchPercentage)}
          </span>
        </div>
        <Progress
          value={matchPercentage}
          className="h-3 w-full max-w-md mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="cute-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              Matching Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <Badge key={index} className="bg-green-700 text-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No matching skills found.</p>
            )}
          </CardContent>
        </Card>

        <Card className="cute-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <XCircle className="h-5 w-5 mr-2 text-custom-peach-dark" />
              Missing Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-custom-peach text-custom-peach-dark">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No missing skills!</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="cute-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Star className="h-5 w-5 mr-2 text-custom-yellow" fill="#FDEDA0" />
            Suggestions to Improve
          </CardTitle>
        </CardHeader>
        <CardContent>
          {suggestions.length > 0 ? (
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 text-custom-blue shrink-0 mt-0.5" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No suggestions available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
