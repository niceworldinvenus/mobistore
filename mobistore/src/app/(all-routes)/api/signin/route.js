import { NextResponse } from 'next/server';

export async function POST(request) {
  const backendUrl = process.env.BACKEND_URL;
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }


    const backendResponse = await fetch(`${backendUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
    
      return NextResponse.json(
        { error: data.detail || 'Invalid email or password' },
        { status: backendResponse.status }
      );
    }

    // Return the full data object to the frontend
  
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('SignIn Route Error:', error);
    return NextResponse.json(
      { error: 'Could not connect to the authentication server.' },
      { status: 500 }
    );
  }
}