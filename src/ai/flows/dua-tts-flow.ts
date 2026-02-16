'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating Text-to-Speech (TTS) for Ramadan Duas.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import wav from 'wav';

const DuaTTSInputSchema = z.string().describe('The Arabic text of the Dua to be converted to speech.');
export type DuaTTSInput = z.infer<typeof DuaTTSInputSchema>;

const DuaTTSOutputSchema = z.object({
  audioUri: z.string().describe('A data URI for the generated WAV audio.'),
});
export type DuaTTSOutput = z.infer<typeof DuaTTSOutputSchema>;

export async function generateDuaAudio(text: string): Promise<DuaTTSOutput> {
  return duaTTSFlow(text);
}

const duaTTSFlow = ai.defineFlow(
  {
    name: 'duaTTSFlow',
    inputSchema: DuaTTSInputSchema,
    outputSchema: DuaTTSOutputSchema,
  },
  async (text) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // Warm, rhythmic voice suitable for Arabic
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      throw new Error('No audio media returned from the model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audioUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));

    writer.write(pcmData);
    writer.end();
  });
}