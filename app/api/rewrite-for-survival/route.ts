import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { SURVIVAL_PROMPTS, SURVIVALIST_SYSTEM_PROMPT, Industry, Section } from '../../../lib/survival-prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text, industry, section } = await request.json();

    // Validate required fields
    if (!text || !industry || !section) {
      return NextResponse.json(
        { error: 'Missing required fields: text, industry, and section are required' },
        { status: 400 }
      );
    }

    // Validate industry
    if (!['tech', 'service', 'healthcare'].includes(industry)) {
      return NextResponse.json(
        { error: 'Invalid industry. Must be one of: tech, service, healthcare' },
        { status: 400 }
      );
    }

    // Validate section
    if (!['objective', 'experience', 'skills'].includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section. Must be one of: objective, experience, skills' },
        { status: 400 }
      );
    }

    const prompt = SURVIVAL_PROMPTS[industry as Industry][section as Section](text);

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
      temperature: 0.3,
      max_tokens: 500,
    });

    const rewrittenText = completion.choices[0]?.message?.content?.trim();

    if (!rewrittenText) {
      return NextResponse.json(
        { error: 'No response received from OpenAI' },
        { status: 502 }
      );
    }

    return NextResponse.json({ rewrittenText });
  } catch (error) {
    console.error('Rewrite for Survival failed:', error);
    
    // Handle OpenAI API errors specifically
    if (error instanceof Error && error.message.includes('OpenAI API')) {
      return NextResponse.json(
        { error: 'OpenAI service is currently unavailable. Please try again later.' },
        { status: 502 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
