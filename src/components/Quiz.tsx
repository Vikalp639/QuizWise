'use client';

import { useState, useEffect, useMemo } from 'react';
import { generateMCQs, type GenerateMCQsOutput } from '@/ai/flows/generate-mcqs';
import { generatePersonalizedFeedback } from '@/ai/flows/generate-personalized-feedback';
import { useToast } from '@/hooks/use-toast';
import QuizLoader from '@/components/QuizLoader';
import QuestionDisplay from '@/components/QuestionDisplay';
import ResultsDisplay from '@/components/ResultsDisplay';

type QuizState = 'loading' | 'active' | 'submitting' | 'results';
type MCQ = GenerateMCQsOutput['mcqs'][0];

export default function Quiz({ topicName }: { topicName: string }) {
  const [quizState, setQuizState] = useState<QuizState>('loading');
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const result = await generateMCQs({ topic: topicName });
        if (result.mcqs && result.mcqs.length > 0) {
          setMcqs(result.mcqs);
          setUserAnswers(new Array(result.mcqs.length).fill(-1));
          setQuizState('active');
        } else {
          throw new Error('No questions were generated.');
        }
      } catch (error) {
        console.error('Failed to generate MCQs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load quiz questions. Please try another topic.',
          variant: 'destructive',
        });
        // Here you might want to redirect or show a permanent error state
      }
    };
    fetchMCQs();
  }, [topicName, toast]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = async () => {
    setQuizState('submitting');
    const calculatedScore = userAnswers.reduce((acc, answer, index) => {
      return answer === mcqs[index].correctAnswerIndex ? acc + 1 : acc;
    }, 0);
    setScore(calculatedScore);

    try {
      const { feedback } = await generatePersonalizedFeedback({
        score: calculatedScore,
        totalQuestions: mcqs.length,
        topic: topicName,
      });
      setFeedback(feedback);
      setQuizState('results');
    } catch (error) {
      console.error('Failed to generate feedback:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate feedback, but here are your results!',
        variant: 'destructive',
      });
      setFeedback('We had trouble generating personalized feedback, but great job on completing the quiz!');
      setQuizState('results');
    }
  };

  const currentMCQ = useMemo(() => mcqs[currentQuestionIndex], [mcqs, currentQuestionIndex]);

  const renderContent = () => {
    switch (quizState) {
      case 'loading':
        return <QuizLoader message={`Generating ${topicName} quiz...`} />;
      case 'submitting':
        return <QuizLoader message="Calculating results and generating feedback..." />;
      case 'active':
        if (!currentMCQ) return <QuizLoader message="Loading question..." />;
        return (
          <QuestionDisplay
            mcq={currentMCQ}
            userAnswer={userAnswers[currentQuestionIndex]}
            onAnswerSelect={(answerIndex) => handleAnswerSelect(currentQuestionIndex, answerIndex)}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={mcqs.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFinish={handleFinish}
            isLastQuestion={currentQuestionIndex === mcqs.length - 1}
          />
        );
      case 'results':
        return (
          <ResultsDisplay
            score={score}
            totalQuestions={mcqs.length}
            feedback={feedback}
            topicName={topicName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {renderContent()}
    </div>
  );
}
