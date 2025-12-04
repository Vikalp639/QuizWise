import { Loader } from 'lucide-react';

interface QuizLoaderProps {
  message: string;
}

export default function QuizLoader({ message }: QuizLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center animate-fade-in">
      <Loader className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground font-medium">{message}</p>
    </div>
  );
}
