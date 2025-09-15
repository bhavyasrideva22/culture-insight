import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ScenarioQuestionProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
}

const ScenarioQuestion = ({ options, value, onChange }: ScenarioQuestionProps) => {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
      {options.map(option => (
        <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
          <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
          <Label 
            htmlFor={option.value}
            className="text-sm cursor-pointer leading-relaxed flex-1"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ScenarioQuestion;