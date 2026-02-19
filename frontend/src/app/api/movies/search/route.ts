import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('s') || 'movie';
    
    const omdbKey = process.env.OMDB_API_KEY;
    if (!omdbKey) {
      return NextResponse.json({ error: 'OMDB API key not configured' }, { status: 500 });
    }

    const response = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&s=${encodeURIComponent(query)}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error('Movie search error:', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
