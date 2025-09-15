import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target } from "lucide-react";
import LikertScale from "@/components/ui/LikertScale";

interface ContextualSectionProps {
  onNext: (data: any) => void;
  onPrevious?: () => void;
  data?: any;
}

const ContextualSection = ({ onNext, onPrevious, data }: ContextualSectionProps) => {
  const [responses, setResponses] = useState(data || {});

  const questions = [
    {
      id: "one_on_one_1",
      type: "likert",
      question: "During 1-on-1 conversations, I regularly check for understanding.",
      category: "one_on_one"
    },
    {
      id: "one_on_one_2",
      type: "likert",
      question: "I adapt my communication style based on who I'm speaking with individually.",
      category: "one_on_one"
    },
    {
      id: "group_1",
      type: "likert",
      question: "In group meetings, I ensure my contributions promote team cohesion.",
      category: "group"
    },
    {
      id: "group_2",
      type: "likert",
      question: "I effectively facilitate discussions in group settings.",
      category: "group"
    },
    {
      id: "conflict_1",
      type: "likert",
      question: "When I notice rising tension, I manage my tone to de-escalate situations.",
      category: "conflict"
    },
    {
      id: "digital_1",
      type: "likert",
      question: "I respond promptly and respectfully in asynchronous communications.",
      category: "digital"
    },
    {
      id: "digital_2",
      type: "likert",
      question: "I am equally effective communicating digitally as I am in person.",
      category: "digital"
    }
  ];

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    const categoryScores = {
      one_on_one: [] as number[],
      group: [] as number[],
      conflict: [] as number[],
      digital: [] as number[]
    };

    questions.forEach(q => {
      const response = responses[q.id];
      if (response !== undefined) {
        const score = (parseInt(response) / 5) * 100;
        categoryScores[q.category as keyof typeof categoryScores].push(score);
      }
    });

    const averageScores: Record<string, number> = Object.entries(categoryScores).reduce((acc, [key, scores]) => {
      acc[key] = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      return acc;
    }, {} as Record<string, number>);

    const overallScore = Object.values(averageScores).reduce((sum, score) => sum + score, 0) / 4;
    
    // Calculate digital vs in-person gap
    const digitalScore = averageScores.digital || 0;
    const inPersonScore = ((averageScores.one_on_one || 0) + (averageScores.group || 0)) / 2;
    const digitalGap = Math.abs(digitalScore - inPersonScore);

    return {
      ...averageScores,
      overall: Math.round(overallScore),
      digitalGap: Math.round(digitalGap),
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
        <div className="w-16 h-16 bg-gradient-to-br from-success to-warning rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Contextual Social Intelligence
        </h2>
        <p className="text-muted-foreground">
          Assess your adaptability across different communication contexts and environments.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-4 bg-assessment-bg">
          <h3 className="font-semibold text-foreground mb-2">What We're Measuring</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 1-on-1 conversation skills</li>
            <li>• Group meeting effectiveness</li>
            <li>• Conflict situation management</li>
            <li>• Digital communication proficiency</li>
          </ul>
        </Card>
        <Card className="p-4 bg-assessment-bg">
          <h3 className="font-semibold text-foreground mb-2">Contextual Agility</h3>
          <p className="text-sm text-muted-foreground">
            Your ability to adapt communication style across different situations and maintain 
            effectiveness in both digital and in-person environments.
          </p>
        </Card>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded">
                  Question {index + 1}
                </span>
                <span className="text-sm text-muted-foreground capitalize">
                  {question.category.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {question.question}
              </h3>
            </div>

            <LikertScale
              value={responses[question.id]}
              onChange={(value) => handleResponse(question.id, value)}
            />
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
            className="bg-gradient-to-r from-success to-warning text-white"
          >
            Complete Contextual Assessment →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContextualSection;