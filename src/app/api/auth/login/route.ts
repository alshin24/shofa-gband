// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

// Simple mock user with plain text password
const MOCK_USER = {
  username: 'shofa',
  password: '130408'
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Simple username and password check
    if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Return success message
    return NextResponse.json(
      { 
        message: 'Login successful',
        user: { username: MOCK_USER.username } 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}