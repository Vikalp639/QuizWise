'use client';

import type { GenerateMCQsOutput } from '@/ai/flows/generate-mcqs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

type MCQ = GenerateMCQsOutput['mcqs'][0];

interface QuestionDisplayProps {
  mcq: MCQ;
  userAnswer: number;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  isLastQuestion: boolean;
}

export default function QuestionDisplay({
  mcq,
  userAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
  onNext,
  onPrevious,
  onFinish,
  isLastQuestion,
}: QuestionDisplayProps) {
  const progressValue = (questionNumber / totalQuestions) * 100;

  return (
    <Card className="w-full max-w-2xl animate-fade-in shadow-xl">
      <CardHeader>
        <CardDescription>
          Question {questionNumber} of {totalQuestions}
        </CardDescription>
        <Progress value={progressValue} className="w-full mt-2" />
        <CardTitle className="font-headline text-2xl pt-4">{mcq.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={userAnswer !== -1 ? userAnswer.toString() : ''}
          onValueChange={(value) => onAnswerSelect(parseInt(value, 10))}
          className="space-y-4"
        >
          {mcq.options.map((option, index) => (
            <Label
              key={index}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                userAnswer === index
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <span className="text-base">{option}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} disabled={questionNumber === 1}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {isLastQuestion ? (
          <Button onClick={onFinish} disabled={userAnswer === -1}>
            Finish Quiz <Check className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={onNext} disabled={userAnswer === -1}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
