import Link from 'next/link';
import { topics } from '@/lib/topics';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-background animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl sm:text-7xl font-bold text-primary">
          QuizWise
        </h1>
        <p className="text-muted-foreground mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
          Challenge your knowledge. Select a topic to begin your AI-powered quiz journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {topics.map((topic) => (
          <Link href={`/quiz/${topic.slug}`} key={topic.slug} className="group">
            <Card className="h-full flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <topic.IconComponent className="w-12 h-12 text-primary" />
                  <div>
                    <CardTitle className="font-headline text-2xl">{topic.name}</CardTitle>
                    <CardDescription className="mt-2">{topic.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <div className="flex justify-end p-4">
                 <ArrowRight className="w-6 h-6 text-muted-foreground transition-transform duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
