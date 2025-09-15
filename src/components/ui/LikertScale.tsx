import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LikertScaleProps {
  value?: string;
  onChange: (value: string) => void;
}

const LikertScale = ({ value, onChange }: LikertScaleProps) => {
  const options = [
    { value: "1", label: "Strongly Disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Neutral" },
    { value: "4", label: "Agree" },
    { value: "5", label: "Strongly Agree" }
  ];

  return (
    <RadioGroup 
      value={value} 
      onValueChange={onChange}
      className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-8 md:justify-between"
    >
      {options.map(option => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label 
            htmlFor={option.value}
            className="text-sm cursor-pointer whitespace-nowrap"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default LikertScale;