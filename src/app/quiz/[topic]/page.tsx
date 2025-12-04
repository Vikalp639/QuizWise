import { notFound } from 'next/navigation';
import { topics, type Topic } from '@/lib/topics';
import Quiz from '@/components/Quiz';

export async function generateStaticParams() {
  return topics.map((topic) => ({
    topic: topic.slug,
  }));
}

export default function QuizPage({ params }: { params: { topic: string } }) {
  const topic = topics.find((t) => t.slug === params.topic);

  if (!topic) {
    notFound();
  }

  return (
    <main>
      <Quiz topic={topic} />
    </main>
  );
}
