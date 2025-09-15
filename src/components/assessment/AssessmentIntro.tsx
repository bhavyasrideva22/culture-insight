import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Users, MessageCircle, Lightbulb } from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
}

const AssessmentIntro = ({ onNext }: AssessmentIntroProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Welcome to the CCI Assessment
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover your unique communication and collaboration style through our comprehensive 
          Cross-Cultural Awareness Assessment. This evaluation will help you understand your 
          strengths, identify growth opportunities, and enhance your professional relationships.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-start space-x-4">
            <MessageCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Communication Intelligence
              </h3>
              <p className="text-muted-foreground">
                Assess your clarity, listening skills, tone awareness, and feedback handling 
                across different communication scenarios.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-accent">
          <div className="flex items-start space-x-4">
            <Users className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Collaboration Intelligence
              </h3>
              <p className="text-muted-foreground">
                Evaluate your team adaptability, trust-building, conflict management, 
                and shared ownership capabilities.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-assessment-bg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Lightbulb className="w-6 h-6 text-warning mr-2" />
          Why Collaboration & Communication Matter
        </h3>
        <p className="text-foreground mb-4">
          In today's interconnected and fast-paced world, collaboration and communication are the 
          cornerstones of success. Beyond just "soft skills," Collaboration & Communication Intelligence (CCI) 
          involves understanding group dynamics, practicing empathy, expressing ideas clearly, and navigating 
          interpersonal complexity with agility.
        </p>
        <p className="text-foreground">
          Mastery in CCI empowers you to build trust, resolve conflicts, and contribute meaningfully to any 
          team or cultural setting. Whether you're working in-person, remotely, or cross-culturally, CCI is 
          your key to thriving in diverse environments.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="p-4">
          <div className="text-2xl font-bold text-primary">5</div>
          <div className="text-sm text-muted-foreground">Assessment Sections</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-accent">20-30</div>
          <div className="text-sm text-muted-foreground">Minutes to Complete</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-success">100</div>
          <div className="text-sm text-muted-foreground">Point Scoring System</div>
        </div>
      </div>

      <div className="text-center pt-6">
        <Button 
          onClick={onNext} 
          size="lg"
          className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 text-lg font-semibold"
        >
          Begin Assessment →
        </Button>
      </div>
    </div>
  );
};

export default AssessmentIntro;