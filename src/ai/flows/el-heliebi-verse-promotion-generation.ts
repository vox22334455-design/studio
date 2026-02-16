'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating an inspiring and well-articulated promotional announcement
 * for the 'EL-Heliebi Verse' platform, subtly acknowledging its creation by Generative AI.
 *
 * - elHeliebiVersePromotionGeneration - A function that generates the promotional text.
 * - ElHeliebiVersePromotionGenerationInput - The input type for the function (void).
 * - ElHeliebiVersePromotionGenerationOutput - The return type for the function (string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElHeliebiVersePromotionGenerationInputSchema = z.void();
export type ElHeliebiVersePromotionGenerationInput = z.infer<
  typeof ElHeliebiVersePromotionGenerationInputSchema
>;

const ElHeliebiVersePromotionGenerationOutputSchema = z.string().describe('The generated promotional announcement text for EL-Heliebi Verse.');
export type ElHeliebiVersePromotionGenerationOutput = z.infer<
  typeof ElHeliebiVersePromotionGenerationOutputSchema
>;

export async function elHeliebiVersePromotionGeneration(
  input: ElHeliebiVersePromotionGenerationInput
): Promise<ElHeliebiVersePromotionGenerationOutput> {
  return elHeliebiVersePromotionGenerationFlow(input);
}

const promotionPrompt = ai.definePrompt({
  name: 'elHeliebiVersePromotionPrompt',
  input: {schema: ElHeliebiVersePromotionGenerationInputSchema},
  output: {schema: ElHeliebiVersePromotionGenerationOutputSchema},
  prompt: `أنت خبير في كتابة الإعلانات التسويقية لتقنيات الذكاء الاصطناعي المتطورة.
مهمتك هي صياغة إعلان ترويجي ملهم ومصاغ ببراعة لمنصة "EL-Heliebi Verse". يجب أن يوضح هذا الإعلان رؤية المنصة القادمة بوضوح وأن يكون استثنائيًا وجذابًا.

إليك المعلومات الأساسية التي يجب تضمينها:
-   قريبًا بإذن الله، سيتم إطلاق تطبيق EL-Heliebi Live.
-   EL-Heliebi Live هو أول ذكاء اصطناعي متطور بالكامل من إنتاج عربي.
-   صُمم لتسهيل الحياة اليومية ودعم الأفراد والأعمال.
-   هو جزء أولي من منظومة EL-Heliebi Verse.
-   EL-Heliebi Verse هي أكبر منصة رقمية عالمية متكاملة.
-   تجمع EL-Heliebi Verse بين الذكاء الاصطناعي والتطبيقات الذكية والتقنيات الرقمية الحديثة.
-   المنصة تمثل "صناعة عربية… برؤية عالمية".

الأهم من ذلك، يجب أن يقر الإعلان بشكل ضمني بأن الذكاء الاصطناعي التوليدي كان له دور فعال في صياغة هذه الرسالة بالذات، لزيادة تأثيرها وجاذبيتها.
اجعل النص مؤثرًا وملهمًا وواضحًا في رؤيته. لا تذكر كلمة "إعلان" أو "رسالة". اكتب النص مباشرة.`
});

const elHeliebiVersePromotionGenerationFlow = ai.defineFlow(
  {
    name: 'elHeliebiVersePromotionGenerationFlow',
    inputSchema: ElHeliebiVersePromotionGenerationInputSchema,
    outputSchema: ElHeliebiVersePromotionGenerationOutputSchema,
  },
  async input => {
    const {output} = await promotionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate promotional text.');
    }
    return output;
  }
);
