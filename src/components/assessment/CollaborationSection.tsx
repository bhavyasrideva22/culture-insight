import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import LikertScale from "@/components/ui/LikertScale";
import ScenarioQuestion from "@/components/ui/ScenarioQuestion";

interface CollaborationSectionProps {
  onNext: (data: any) => void;
  onPrevious?: () => void;
  data?: any;
}

const CollaborationSection = ({ onNext, onPrevious, data }: CollaborationSectionProps) => {
  const [responses, setResponses] = useState(data || {});

  const questions = [
    {
      id: "adaptability_1",
      type: "scenario",
      question: "A new team member's working style clashes with yours. How do you respond?",
      options: [
        { value: "adapt", label: "Adapt my style to find common ground and improve collaboration" },
        { value: "discuss", label: "Have an open discussion about our different approaches" },
        { value: "maintain", label: "Maintain my approach while being respectful of theirs" },
        { value: "avoid", label: "Work around the differences without direct confrontation" }
      ],
      category: "adaptability"
    },
    {
      id: "trust_1",
      type: "likert",
      question: "I am reliable and transparent with my team members.",
      category: "trust"
    },
    {
      id: "trust_2",
      type: "likert",
      question: "I follow through consistently on my commitments to the team.",
      category: "trust"
    },
    {
      id: "conflict_1",
      type: "scenario",
      question: "Two colleagues argue during a team meeting. What is your approach?",
      options: [
        { value: "mediate", label: "Step in to mediate and help find common ground" },
        { value: "redirect", label: "Redirect the conversation back to productive discussion" },
        { value: "private", label: "Suggest they discuss it privately after the meeting" },
        { value: "observe", label: "Let them work it out while observing the dynamics" }
      ],
      category: "conflict"
    },
    {
      id: "ownership_1",
      type: "likert",
      question: "I willingly share credit and support team members' success.",
      category: "ownership"
    },
    {
      id: "ownership_2",
      type: "likert",
      question: "I take responsibility for team outcomes, both positive and negative.",
      category: "ownership"
    }
  ];

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    const categoryScores = {
      adaptability: [] as number[],
      trust: [] as number[],
      conflict: [] as number[],
      ownership: [] as number[]
    };

    questions.forEach(q => {
      const response = responses[q.id];
      if (response !== undefined) {
        let score = 0;
        if (q.type === "likert") {
          score = (parseInt(response) / 5) * 100;
        } else if (q.type === "scenario") {
          const weights: Record<string, number> = {
            "adapt": 90, "discuss": 85, "maintain": 60, "avoid": 40,
            "mediate": 85, "redirect": 80, "private": 70, "observe": 55
          };
          score = weights[response] || 50;
        }
        categoryScores[q.category as keyof typeof categoryScores].push(score);
      }
    });

    const averageScores: Record<string, number> = Object.entries(categoryScores).reduce((acc, [key, scores]) => {
      acc[key] = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      return acc;
    }, {} as Record<string, number>);

    const overallScore = Object.values(averageScores).reduce((sum, score) => sum + score, 0) / 4;

    return {
      ...averageScores,
      overall: Math.round(overallScore),
      responses
    };
  };

  const handleSubmit = () => {
    const scoreData = calculateScore();
    onNext(scoreData);
  };

  const isComplete = questions.every(q => responses[q.id] !== undefined);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Collaboration Intelligence
        </h2>
        <p className="text-muted-foreground">
          Evaluate your team adaptability, trust-building, conflict management, and shared ownership.
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                  Question {index + 1}
                </span>
                <span className="text-sm text-muted-foreground capitalize">
                  {question.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {question.question}
              </h3>
            </div>

            {question.type === "likert" ? (
              <LikertScale
                value={responses[question.id]}
                onChange={(value) => handleResponse(question.id, value)}
              />
            ) : (
              <ScenarioQuestion
                options={question.options || []}
                value={responses[question.id]}
                onChange={(value) => handleResponse(question.id, value)}
              />
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        {onPrevious && (
          <Button variant="outline" onClick={onPrevious}>
            ← Previous Section
          </Button>
        )}
        <div className="ml-auto">
          <Button 
            onClick={handleSubmit}
            disabled={!isComplete}
            className="bg-gradient-to-r from-accent to-primary text-white"
          >
            Complete Collaboration Assessment →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSection;