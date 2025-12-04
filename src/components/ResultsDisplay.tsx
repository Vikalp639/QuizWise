'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Award, BrainCircuit } from 'lucide-react';

interface ResultsDisplayProps {
  score: number;
  totalQuestions: number;
  feedback: string;
  topicName: string;
}

export default function ResultsDisplay({ score, totalQuestions, feedback, topicName }: ResultsDisplayProps) {
  const scorePercentage = Math.round((score / totalQuestions) * 100);

  return (
    <Card className="w-full max-w-2xl animate-fade-in shadow-xl">
      <CardHeader className="text-center">
        <Award className="mx-auto h-16 w-16 text-primary" />
        <CardTitle className="font-headline text-3xl mt-4">Quiz Complete!</CardTitle>
        <CardDescription className="text-lg">Here are your results for the {topicName} quiz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center items-center p-6 rounded-lg bg-primary/10">
            <p className="text-5xl font-bold text-primary">{score}<span className="text-3xl font-medium text-muted-foreground">/{totalQuestions}</span></p>
            <Separator orientation="vertical" className="h-16 mx-6" />
            <p className="text-5xl font-bold text-primary">{scorePercentage}<span className="text-3xl font-medium text-muted-foreground">%</span></p>
        </div>
        
        <div className="space-y-4">
            <h3 className="flex items-center font-headline text-xl font-semibold text-primary">
                <BrainCircuit className="mr-3 h-6 w-6" />
                AI-Generated Feedback
            </h3>
            <blockquote className="border-l-4 border-primary pl-4 py-2 bg-background">
                <p className="text-muted-foreground italic">
                    {feedback}
                </p>
            </blockquote>
        </div>

      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" size="lg">
          <Link href="/">Try Another Quiz</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
