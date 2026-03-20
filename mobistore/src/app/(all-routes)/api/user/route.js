import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
const backendUrl = process.env.BACKEND_URL;
  const cookieStore = await cookies(); 
  

  const userId = cookieStore.get('user_id')?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`${backendUrl}/user/${userId}`, {
      cache: 'no-store'
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Backend connection failed" }, { status: 500 });
  }
}