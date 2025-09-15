import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";
import LikertScale from "@/components/ui/LikertScale";
import ScenarioQuestion from "@/components/ui/ScenarioQuestion";

interface CoachSectionProps {
  onNext: (data: any) => void;
  onPrevious?: () => void;
  data?: any;
}

const CoachSection = ({ onNext, onPrevious, data }: CoachSectionProps) => {
  const [responses, setResponses] = useState(data || {});

  const questions = [
    {
      id: "clarity_1",
      type: "likert",
      question: "I explain ideas clearly and check for comprehension.",
      category: "clarity"
    },
    {
      id: "clarity_2",
      type: "likert",
      question: "I ask clarifying questions when I don't understand something.",
      category: "clarity"
    },
    {
      id: "openness_1",
      type: "likert",
      question: "I welcome constructive criticism and feedback.",
      category: "openness"
    },
    {
      id: "openness_2",
      type: "scenario",
      question: "A colleague gives you feedback that feels harsh. How do you respond?",
      options: [
        { value: "listen", label: "Listen fully, ask questions, and thank them for the input" },
        { value: "defend", label: "Explain my perspective while acknowledging their points" },
        { value: "deflect", label: "Accept it politely but focus on moving forward" },
        { value: "avoid", label: "Acknowledge briefly and change the subject" }
      ],
      category: "openness"
    },
    {
      id: "alignment_1",
      type: "likert",
      question: "I understand and empathize with others' perspectives, even when different from mine.",
      category: "alignment"
    },
    {
      id: "conflict_1",
      type: "likert",
      question: "I handle disagreements without escalating tension.",
      category: "conflict"
    },
    {
      id: "conflict_2",
      type: "scenario",
      question: "You're mediating between two team members who disagree. What's your approach?",
      options: [
        { value: "neutral", label: "Remain neutral and help them find common ground" },
        { value: "structure", label: "Create structured dialogue with clear rules" },
        { value: "separate", label: "Meet with each person individually first" },
        { value: "decide", label: "Make a decision based on what's best for the team" }
      ],
      category: "conflict"
    },
    {
      id: "harmony_1",
      type: "likert",
      question: "I help maintain team cohesion and positive relationships.",
      category: "harmony"
    },
    {
      id: "harmony_2",
      type: "likert",
      question: "I consistently follow through on my commitments to the team.",
      category: "harmony"
    }
  ];

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    const categoryScores = {
      clarity: [] as number[],
      openness: [] as number[],
      alignment: [] as number[],
      conflict: [] as number[],
      harmony: [] as number[]
    };

    questions.forEach(q => {
      const response = responses[q.id];
      if (response !== undefined) {
        let score = 0;
        if (q.type === "likert") {
          score = (parseInt(response) / 5) * 100;
        } else if (q.type === "scenario") {
          const weights: Record<string, number> = {
            "listen": 95, "defend": 70, "deflect": 60, "avoid": 40,
            "neutral": 90, "structure": 85, "separate": 75, "decide": 60
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

    const overallScore = Object.values(averageScores).reduce((sum, score) => sum + score, 0) / 5;

    // Determine archetype based on strongest dimensions
    let archetype = "Balanced Collaborator";
    const topScores = Object.entries(averageScores).sort(([,a], [,b]) => (b as number) - (a as number));
    
    if ((topScores[0][1] as number) > 85) {
      const topDimension = topScores[0][0];
      if (topDimension === "openness" && averageScores.clarity > 80) {
        archetype = "Candid Collaborator";
      } else if (topDimension === "alignment" && averageScores.harmony > 80) {
        archetype = "Empathetic Mediator";
      } else if (topDimension === "clarity" && averageScores.harmony > 80) {
        archetype = "Diplomatic Executor";
      }
    }

    return {
      ...averageScores,
      overall: Math.round(overallScore),
      archetype,
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
        <div className="w-16 h-16 bg-gradient-to-br from-warning to-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          COACH Framework Diagnostic
        </h2>
        <p className="text-muted-foreground">
          Comprehensive evaluation across five key collaboration dimensions.
        </p>
      </div>

      <div className="bg-assessment-bg rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">The COACH Framework</h3>
        <div className="grid md:grid-cols-5 gap-4 text-center">
          <div>
            <div className="font-bold text-primary text-xl">C</div>
            <div className="text-sm text-muted-foreground">Clarity & Comprehension</div>
          </div>
          <div>
            <div className="font-bold text-accent text-xl">O</div>
            <div className="text-sm text-muted-foreground">Openness & Feedback</div>
          </div>
          <div>
            <div className="font-bold text-success text-xl">A</div>
            <div className="text-sm text-muted-foreground">Alignment & Empathy</div>
          </div>
          <div>
            <div className="font-bold text-warning text-xl">C</div>
            <div className="text-sm text-muted-foreground">Conflict Navigation</div>
          </div>
          <div>
            <div className="font-bold text-destructive text-xl">H</div>
            <div className="text-sm text-muted-foreground">Harmony & Follow-Through</div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-warning bg-warning/10 px-2 py-1 rounded">
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
            className="bg-gradient-to-r from-warning to-success text-white"
          >
            Complete COACH Assessment →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoachSection;