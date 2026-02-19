import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.execute(
      'INSERT INTO users (id, name, email, password, phone) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, hashedPassword, phone || null]
    );

    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 400 });
    }
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Server error during signup.' }, { status: 500 });
  }
}
