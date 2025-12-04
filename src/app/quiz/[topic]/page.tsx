import { notFound } from 'next/navigation';
import { topics } from '@/lib/topics';
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

  // We only pass the serializable properties to the client component
  const { name, description, mcqs } = topic;

  return (
    <main>
      <Quiz name={name} description={description} mcqs={mcqs} />
    </main>
  );
}
