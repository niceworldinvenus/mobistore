import { NextResponse } from 'next/server';

export async function POST(request) {
  const backendUrl = process.env.BACKEND_URL;
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Forwarding to FastAPI
    const response = await fetch(`${backendUrl || 'http://localhost:8000'}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || 'Signup failed' }, { status: response.status });
    }

    return NextResponse.json({ message: 'User created successfully', user: data });
  } catch (error) {
    console.error('Signup Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}