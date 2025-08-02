// app/api/nasa-feed/route.ts
import { NextResponse } from 'next/server';
import { fetchNASAFeed } from '@/lib/fetchNASAFeed';

export async function GET() {
  const items = await fetchNASAFeed();
  return NextResponse.json(items);
}
