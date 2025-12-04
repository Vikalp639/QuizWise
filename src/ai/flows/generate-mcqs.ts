'use server';

/**
 * @fileOverview Flow for generating multiple-choice questions (MCQs) on a given topic, incorporating varying difficulty levels.
 *
 * - generateMCQs - A function that generates MCQs for a given topic.
 * - GenerateMCQsInput - The input type for the generateMCQs function.
 * - GenerateMCQsOutput - The return type for the generateMCQs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MCQSchema = z.object({
  question: z.string().describe('The text of the question.'),
  options: z.array(z.string()).length(4).describe('Four possible answers to the question.'),
  correctAnswerIndex: z.number().int().min(0).max(3).describe('The index of the correct answer in the options array.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the question.'),
});

const GenerateMCQsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate MCQs.'),
});
export type GenerateMCQsInput = z.infer<typeof GenerateMCQsInputSchema>;

const GenerateMCQsOutputSchema = z.object({
  mcqs: z.array(MCQSchema).length(5).describe('An array of 5 MCQs for the given topic.'),
});
export type GenerateMCQsOutput = z.infer<typeof GenerateMCQsOutputSchema>;

const classifyDifficultyTool = ai.defineTool({
  name: 'classifyDifficulty',
  description: 'Classifies the difficulty level of a question based on its complexity and the knowledge required to answer it.',
  inputSchema: z.object({
    question: z.string().describe('The question to classify.'),
    topic: z.string().describe('The topic the question belongs to.'),
  }),
  outputSchema: z.enum(['easy', 'medium', 'hard']),
}, async (input) => {
  // Basic implementation (can be improved with a more sophisticated difficulty assessment).
  if (input.question.length < 50) {
    return 'easy';
  } else if (input.question.length < 100) {
    return 'medium';
  } else {
    return 'hard';
  }
});

export async function generateMCQs(input: GenerateMCQsInput): Promise<GenerateMCQsOutput> {
  return generateMCQsFlow(input);
}

const generateMCQsPrompt = ai.definePrompt({
  name: 'generateMCQsPrompt',
  input: {schema: GenerateMCQsInputSchema},
  output: {schema: GenerateMCQsOutputSchema},
  tools: [classifyDifficultyTool],
  prompt: `You are an expert in generating multiple-choice questions (MCQs) for various topics. Generate 5 MCQs for the topic: {{{topic}}}.

Each MCQ should have 4 options, and only one correct answer. The difficulty levels of the questions should vary (easy, medium, and hard).

Ensure that the generated MCQs are diverse and cover different aspects of the topic. Use the classifyDifficulty tool to set the difficulty level of the questions. If a generated question does not fit the topic, generate an alternative.

Output the MCQs in the following JSON format:

${JSON.stringify(GenerateMCQsOutputSchema.shape, null, 2)}`,
});

const generateMCQsFlow = ai.defineFlow(
  {
    name: 'generateMCQsFlow',
    inputSchema: GenerateMCQsInputSchema,
    outputSchema: GenerateMCQsOutputSchema,
  },
  async input => {
    const {output} = await generateMCQsPrompt(input);
    return output!;
  }
);
