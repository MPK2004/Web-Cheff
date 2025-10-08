// app/api/cohere/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.COHERE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found.' }, { status: 500 });
    }

    const apiUrl = 'https://api.cohere.ai/v1/generate';
    const payload = {
      model: 'command-r-plus',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.75,
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return NextResponse.json({ 
        error: errorBody.message || 'Failed to fetch from Cohere API' 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Cohere API route error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}