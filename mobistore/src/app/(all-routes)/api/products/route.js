import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const skip = searchParams.get('skip') || '0';
  const limit = searchParams.get('limit') || '10';
  const backendUrl = process.env.BACKEND_URL;
  try {
    // Calling FastAPI backend
    const response = await fetch(`${backendUrl}/products?skip=${skip}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Ensures Next.js doesn't cache stale stock or price data
      cache: 'no-store', 
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Data transformation (Standard JavaScript)
 
    const processedData = data.map(product => ({
      ...product,
      isNew: new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }));

    return NextResponse.json(processedData);

  } catch (error) {
    console.error("Route Handler Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error. Is FastAPI running?' },
      { status: 500 }
    );
  }
}