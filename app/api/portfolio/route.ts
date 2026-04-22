import { NextRequest, NextResponse } from 'next/server';
import { PortfolioItem } from '@/types/portfolio';

// Mock data - replace with database
let portfolioItems: PortfolioItem[] = [];

// GET - Fetch portfolio items
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let filteredItems = portfolioItems;

  if (category) {
    filteredItems = portfolioItems.filter((item) => item.category === category);
  }

  return NextResponse.json(filteredItems);
}

// POST - Create new portfolio item
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    // Simple auth check - in production, use proper JWT/session
    const adminId = process.env.ADMIN_ID || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';
    const expectedAuth = `Basic ${btoa(`${adminId}:${adminPassword}`)}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, date, category, mainImage, images, videoUrl } = body;

    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title,
      description,
      date,
      category,
      mainImage,
      images: images || [],
      videoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    portfolioItems.push(newItem);

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}

// DELETE - Remove portfolio item
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    const adminId = process.env.ADMIN_ID || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';
    const expectedAuth = `Basic ${btoa(`${adminId}:${adminPassword}`)}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    portfolioItems = portfolioItems.filter((item) => item.id !== id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
}
