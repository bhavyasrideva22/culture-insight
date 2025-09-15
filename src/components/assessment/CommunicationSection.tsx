import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MessageCircle } from "lucide-react";
import LikertScale from "@/components/ui/LikertScale";
import ScenarioQuestion from "@/components/ui/ScenarioQuestion";

interface CommunicationSectionProps {
  onNext: (data: any) => void;
  onPrevious?: () => void;
  data?: any;
}

const CommunicationSection = ({ onNext, onPrevious, data }: CommunicationSectionProps) => {
  const [responses, setResponses] = useState(data || {});

  const questions = [
    {
      id: "clarity_1",
      type: "likert",
      question: "I find it easy to explain complex ideas so others can understand quickly.",
      category: "clarity"
    },
    {
      id: "clarity_2", 
      type: "likert",
      question: "My written communication is clear and well-structured.",
      category: "clarity"
    },
    {
      id: "listening_1",
      type: "scenario",
      question: "During a conversation, you notice the other person's eyes wander. What is your best next step?",
      options: [
        { value: "refocus", label: "Ask an engaging question to refocus their attention" },
        { value: "interrupt", label: "Stop talking and directly address their distraction" },
        { value: "continue", label: "Continue speaking but adjust your energy level" },
        { value: "wait", label: "Pause and wait for them to re-engage naturally" }
      ],
      category: "listening"
    },
    {
      id: "tone_1",
      type: "scenario", 
      question: "You're emailing a client who seems upset. How do you adjust your tone?",
      options: [
        { value: "empathetic", label: "Use empathetic language and acknowledge their concerns first" },
        { value: "professional", label: "Keep it strictly professional and fact-based" },
        { value: "apologetic", label: "Start with an apology regardless of fault" },
        { value: "solution", label: "Focus immediately on solutions without emotion" }
      ],
      category: "tone"
    },
    {
      id: "feedback_1",
      type: "likert",
      question: "When receiving critical feedback, I respond calmly without defensiveness.",
      category: "feedback"
    },
    {
      id: "feedback_2",
      type: "likert", 
      question: "I actively seek feedback to improve my communication skills.",
      category: "feedback"
    }
  ];

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    const categoryScores = {
      clarity: [],
      listening: [],
      tone: [],
      feedback: []
    };

    questions.forEach(q => {
      const response = responses[q.id];
      if (response !== undefined) {
        let score = 0;
        if (q.type === "likert") {
          score = (parseInt(response) / 5) * 100;
        } else if (q.type === "scenario") {
          // Weighted scoring for scenario responses
          const weights = {
            "refocus": 85, "wait": 75, "continue": 60, "interrupt": 40,
            "empathetic": 90, "professional": 75, "solution": 65, "apologetic": 45
          };
          score = weights[response as keyof typeof weights] || 50;
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
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Communication Intelligence
        </h2>
        <p className="text-muted-foreground">
          Assess your clarity, listening style, tone awareness, and feedback handling skills.
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
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
            className="bg-gradient-to-r from-primary to-accent text-white"
          >
            Complete Communication Assessment →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationSection;