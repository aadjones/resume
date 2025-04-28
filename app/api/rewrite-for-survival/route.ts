import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, industry } = body;

    // Validate required fields
    if (!text || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields: text and industry' },
        { status: 400 }
      );
    }

    // Validate industry
    const validIndustries = ['tech', 'service', 'healthcare'];
    if (!validIndustries.includes(industry)) {
      return NextResponse.json(
        { error: 'Invalid industry. Must be one of: tech, service, healthcare' },
        { status: 400 }
      );
    }

    // TODO: Implement LLM call here
    // For now, return a mock response
    const mockResponse = {
      rewrittenText: `[Survivalized version of: ${text}]`,
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Error in rewrite-for-survival:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 