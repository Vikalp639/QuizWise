'use server';

/**
 * @fileOverview A flow to generate personalized feedback based on the user's quiz score.
 *
 * - generatePersonalizedFeedback - A function that generates personalized feedback.
 * - GeneratePersonalizedFeedbackInput - The input type for the generatePersonalizedFeedback function.
 * - GeneratePersonalizedFeedbackOutput - The return type for the generatePersonalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedFeedbackInputSchema = z.object({
  score: z.number().describe('The user\'s score on the quiz.'),
  totalQuestions: z.number().describe('The total number of questions in the quiz.'),
  topic: z.string().describe('The topic of the quiz.'),
});
export type GeneratePersonalizedFeedbackInput = z.infer<
  typeof GeneratePersonalizedFeedbackInputSchema
>;

const GeneratePersonalizedFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The personalized feedback message.'),
});
export type GeneratePersonalizedFeedbackOutput = z.infer<
  typeof GeneratePersonalizedFeedbackOutputSchema
>;

export async function generatePersonalizedFeedback(
  input: GeneratePersonalizedFeedbackInput
): Promise<GeneratePersonalizedFeedbackOutput> {
  return generatePersonalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedFeedbackPrompt',
  input: {schema: GeneratePersonalizedFeedbackInputSchema},
  output: {schema: GeneratePersonalizedFeedbackOutputSchema},
  prompt: `You are an AI quiz feedback generator. Generate a personalized feedback message for the user based on their score, the total number of questions, and the topic of the quiz. The feedback should be encouraging and provide areas for improvement.

Here is the user's quiz information:

Topic: {{{topic}}}
Score: {{{score}}} / {{{totalQuestions}}}

Personalized Feedback:`,
});

const generatePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedFeedbackFlow',
    inputSchema: GeneratePersonalizedFeedbackInputSchema,
    outputSchema: GeneratePersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
