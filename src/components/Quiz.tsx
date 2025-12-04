'use client';

import { useState, useMemo, useEffect } from 'react';
import type { MCQ } from '@/lib/topics';
import QuizLoader from '@/components/QuizLoader';
import QuestionDisplay from '@/components/QuestionDisplay';
import ResultsDisplay from '@/components/ResultsDisplay';

type QuizState = 'loading' | 'active' | 'results';

interface QuizProps {
  name: string;
  description: string;
  mcqs: MCQ[];
}

export default function Quiz({ name, mcqs: initialMcqs }: QuizProps) {
  const [quizState, setQuizState] = useState<QuizState>('loading');
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Simulate loading to prevent jarring UI shift
    const timer = setTimeout(() => {
      setMcqs(initialMcqs);
      setUserAnswers(new Array(initialMcqs.length).fill(-1));
      setQuizState('active');
    }, 500); // 0.5 second delay

    return () => clearTimeout(timer);
  }, [initialMcqs]);

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

  const handleFinish = () => {
    const calculatedScore = userAnswers.reduce((acc, answer, index) => {
      return answer === mcqs[index].correctAnswerIndex ? acc + 1 : acc;
    }, 0);
    setScore(calculatedScore);
    setQuizState('results');
  };

  const currentMCQ = useMemo(() => mcqs[currentQuestionIndex], [mcqs, currentQuestionIndex]);

  const renderContent = () => {
    switch (quizState) {
      case 'loading':
        return <QuizLoader message={`Loading ${name} quiz...`} />;
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
            feedback="Great job completing the quiz! Review your answers and try another topic to expand your knowledge."
            topicName={name}
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
