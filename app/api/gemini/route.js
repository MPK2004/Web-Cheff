import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { contents, responseMimeType } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found in environment variables.' }, { status: 500 });
    }

    // This logic determines if the request includes an image
    const model = 'gemini-2.5-pro';
      
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const payload = { contents, generationConfig: { responseMimeType } };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // If the response from Google is not OK, handle it safely
    if (!response.ok) {
      let errorBody = { error: `API call failed with status: ${response.status}` };
      try {
        // Try to parse the error as JSON, as Google's API usually does
        const errorData = await response.json();
        errorBody.error = errorData.error?.message || JSON.stringify(errorData);
      } catch (e) {
        // If parsing fails, it's not a JSON error. Read it as text.
        errorBody.error = await response.text();
      }
      console.error('Google API Error:', errorBody.error);
      return NextResponse.json({ error: errorBody.error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    // This will now log the specific error on your server's console
    console.error('Gemini API route internal error:', error);
    
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
