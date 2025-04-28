import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { SURVIVAL_PROMPTS, SURVIVALIST_SYSTEM_PROMPT, Industry } from '../../../lib/survival-prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text, industry } = await request.json();

    if (!text || !industry || !['tech', 'service', 'healthcare'].includes(industry)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const prompt = SURVIVAL_PROMPTS[industry as Industry].replace('{text}', text);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: SURVIVALIST_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3, // lower = more focused, less rambling
      max_tokens: 500, // shorter max length to prevent bloated output
    });

    const rewrittenText = completion.choices[0]?.message?.content?.trim();

    if (!rewrittenText) {
      throw new Error('No rewritten text returned');
    }

    return NextResponse.json({ rewrittenText });
  } catch (error) {
    console.error('Rewrite for Survival failed:', error);
    return NextResponse.json({ error: 'Rewrite failed' }, { status: 502 });
  }
}
