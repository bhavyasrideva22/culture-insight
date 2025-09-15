import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Brain, Download, RefreshCw } from "lucide-react";
import { AssessmentData } from "@/pages/Index";

interface ResultsPanelProps {
  assessmentData: AssessmentData;
}

const ResultsPanel = ({ assessmentData }: ResultsPanelProps) => {
  // Calculate overall CCI score
  const calculateOverallScore = () => {
    const scores = [
      assessmentData.communication?.overall || 0,
      assessmentData.collaboration?.overall || 0,
      assessmentData.contextual?.overall || 0,
      assessmentData.coach?.overall || 0
    ];
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const overallScore = calculateOverallScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "score-excellent";
    if (score >= 60) return "score-good";
    return "score-needs-work";
  };

  const getRecommendation = (score: number) => {
    if (score >= 80) return "Collaborate Confidently";
    if (score >= 50) return "Grow";
    return "Reassess";
  };

  const getPersonalizedTip = () => {
    const lowestScore = Math.min(
      assessmentData.communication?.overall || 100,
      assessmentData.collaboration?.overall || 100,
      assessmentData.contextual?.overall || 100,
      assessmentData.coach?.overall || 100
    );
    
    if (lowestScore === assessmentData.communication?.overall) {
      return "Practice active listening in meetings and ask more clarifying questions";
    } else if (lowestScore === assessmentData.collaboration?.overall) {
      return "Focus on building trust through transparency and consistent follow-through";
    } else if (lowestScore === assessmentData.contextual?.overall) {
      return "Develop your digital communication skills and context-switching abilities";
    } else {
      return "Work on receiving feedback more openly and managing conflict constructively";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-assessment-bg to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your CCI Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Collaboration & Communication Intelligence Profile
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 p-8 text-center bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="mb-4">
            <div className={`text-6xl font-bold text-${getScoreColor(overallScore)} mb-2`}>
              {overallScore}
            </div>
            <div className="text-sm text-muted-foreground">Overall CCI Score</div>
          </div>
          <Progress value={overallScore} className="w-full h-4 mb-4" />
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {getRecommendation(overallScore)}
          </Badge>
        </Card>

        {/* Section Scores Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="mb-4">
              <div className={`text-3xl font-bold text-${getScoreColor(assessmentData.communication?.overall || 0)} mb-2`}>
                {assessmentData.communication?.overall || 0}
              </div>
              <div className="text-sm text-muted-foreground">Communication Intelligence</div>
            </div>
            <Progress value={assessmentData.communication?.overall || 0} className="w-full h-2" />
          </Card>
          
          <Card className="p-6 text-center">
            <div className="mb-4">
              <div className={`text-3xl font-bold text-${getScoreColor(assessmentData.collaboration?.overall || 0)} mb-2`}>
                {assessmentData.collaboration?.overall || 0}
              </div>
              <div className="text-sm text-muted-foreground">Collaboration Intelligence</div>
            </div>
            <Progress value={assessmentData.collaboration?.overall || 0} className="w-full h-2" />
          </Card>
          
          <Card className="p-6 text-center">
            <div className="mb-4">
              <div className={`text-3xl font-bold text-${getScoreColor(assessmentData.contextual?.overall || 0)} mb-2`}>
                {assessmentData.contextual?.overall || 0}
              </div>
              <div className="text-sm text-muted-foreground">Contextual Intelligence</div>
            </div>
            <Progress value={assessmentData.contextual?.overall || 0} className="w-full h-2" />
          </Card>
          
          <Card className="p-6 text-center">
            <div className="mb-4">
              <div className={`text-3xl font-bold text-${getScoreColor(assessmentData.coach?.overall || 0)} mb-2`}>
                {assessmentData.coach?.overall || 0}
              </div>
              <div className="text-sm text-muted-foreground">COACH Framework</div>
            </div>
            <Progress value={assessmentData.coach?.overall || 0} className="w-full h-2" />
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Strengths & Style */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-primary" />
              Your Profile
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Communication Style</div>
                <div className="font-medium text-foreground">
                  {assessmentData.communication?.clarity > 80 ? "Clear & Direct Communicator" : "Developing Communicator"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Collaboration Personality</div>
                <div className="font-medium text-foreground">
                  {assessmentData.coach?.archetype || "Balanced Collaborator"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Digital vs In-Person Gap</div>
                <div className="font-medium text-foreground">
                  {(assessmentData.contextual?.digitalGap || 0) < 15 ? "Minimal Gap" : "Needs Attention"}
                </div>
              </div>
            </div>
          </Card>

          {/* Growth Plan */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-success" />
              Growth Plan
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Top Growth Area</div>
                <div className="font-medium text-foreground">
                  {getPersonalizedTip().split(' and ')[0]}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Development Focus</div>
                <div className="font-medium text-foreground">
                  {getPersonalizedTip()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Team Environment Fit</div>
                <div className="font-medium text-foreground">
                  {overallScore > 75 ? "Agile & Flat Organizations" : "Structured Teams with Clear Processes"}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent text-white"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Results
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>
            This assessment provides insights for professional development. 
            Results are based on self-reported responses and should be used as a starting point for growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;