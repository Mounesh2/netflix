import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    
    const [rows]: any = await pool.execute(
      'SELECT id, name, email, phone, created_at FROM users WHERE id = ?',
      [decoded.id]
    );
    
    const user = rows[0];
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('Me error:', err);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
