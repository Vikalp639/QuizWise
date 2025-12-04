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
  options: z.array(z.string()).length(4).describe('An array of exactly four possible answers to the question.'),
  correctAnswerIndex: z.number().int().min(0).max(3).describe('The 0-based index of the correct answer in the options array.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the question.'),
});

const GenerateMCQsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate MCQs.'),
});
export type GenerateMCQsInput = z.infer<typeof GenerateMCQsInputSchema>;

const GenerateMCQsOutputSchema = z.object({
  mcqs: z.array(MCQSchema).length(5).describe('An array of exactly 5 MCQs for the given topic.'),
});
export type GenerateMCQsOutput = z.infer<typeof GenerateMCQsOutputSchema>;


export async function generateMCQs(input: GenerateMCQsInput): Promise<GenerateMCQsOutput> {
  return generateMCQsFlow(input);
}

const generateMCQsPrompt = ai.definePrompt({
  name: 'generateMCQsPrompt',
  input: {schema: GenerateMCQsInputSchema},
  output: {schema: GenerateMCQsOutputSchema},
  prompt: `You are an expert quiz generator. Your task is to generate a JSON object containing exactly 5 multiple-choice questions (MCQs) for the topic: {{{topic}}}.

You MUST adhere to the following strict constraints:
1.  The output MUST be a single JSON object.
2.  The JSON object must have a key named "mcqs".
3.  The value of "mcqs" MUST be an array of EXACTLY 5 question objects.
4.  Each question object in the array must contain:
    - "question": A string for the question text.
    - "options": An array of EXACTLY 4 strings representing the possible answers.
    - "correctAnswerIndex": An integer from 0 to 3, representing the index of the correct answer in the "options" array.
    - "difficulty": A string that is one of "easy", "medium", or "hard".

Do not deviate from this format. Your entire response must be only the specified JSON object.`,
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
