import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Users, MessageCircle, Target, Award } from "lucide-react";
import AssessmentIntro from "@/components/assessment/AssessmentIntro";
import CommunicationSection from "@/components/assessment/CommunicationSection";
import CollaborationSection from "@/components/assessment/CollaborationSection";
import ContextualSection from "@/components/assessment/ContextualSection";
import CoachSection from "@/components/assessment/CoachSection";
import ResultsPanel from "@/components/assessment/ResultsPanel";

export interface AssessmentData {
  communication: any;
  collaboration: any;
  contextual: any;
  coach: any;
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    communication: {},
    collaboration: {},
    contextual: {},
    coach: {}
  });
  const [isComplete, setIsComplete] = useState(false);

  const sections = [
    { id: "intro", title: "Introduction", icon: Brain, component: AssessmentIntro },
    { id: "communication", title: "Communication Intelligence", icon: MessageCircle, component: CommunicationSection },
    { id: "collaboration", title: "Collaboration Intelligence", icon: Users, component: CollaborationSection },
    { id: "contextual", title: "Contextual Social Intelligence", icon: Target, component: ContextualSection },
    { id: "coach", title: "COACH Framework", icon: Award, component: CoachSection },
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleNext = (sectionData?: any) => {
    if (sectionData && currentSection > 0) {
      const sectionKey = sections[currentSection].id as keyof AssessmentData;
      setAssessmentData(prev => ({ ...prev, [sectionKey]: sectionData }));
    }

    if (currentSection === sections.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const CurrentComponent = sections[currentSection]?.component;

  if (isComplete) {
    return <ResultsPanel assessmentData={assessmentData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-assessment-bg to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Cross-Cultural Awareness Assessment
          </h1>
          <p className="text-xl text-muted-foreground">
            Collaboration & Communication Intelligence (CCI)
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              {sections[currentSection]?.title}
            </h2>
            <span className="text-sm text-muted-foreground">
              {currentSection + 1} of {sections.length}
            </span>
          </div>
          <Progress value={progress} className="w-full h-3" />
          <div className="mt-2 text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </div>
        </Card>

        {/* Section Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                    index === currentSection
                      ? "bg-primary text-primary-foreground"
                      : index < currentSection
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {section.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Section Content */}
        <Card className="mb-8">
          <div className="p-8">
            {CurrentComponent && (
              <CurrentComponent
                onNext={handleNext}
                onPrevious={currentSection > 0 ? handlePrevious : undefined}
                data={assessmentData[sections[currentSection].id as keyof AssessmentData]}
              />
            )}
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center space-x-2"
          >
            <span>← Previous</span>
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Take your time - this assessment typically takes 20-30 minutes
            </p>
          </div>

          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </div>
    </div>
  );
};

export default Index;