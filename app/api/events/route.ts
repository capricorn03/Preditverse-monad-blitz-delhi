import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const events = await db.collection('events').find({}).toArray();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('events').insertOne(body);
    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { _id, ...update } = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('events').updateOne({ _id }, { $set: update });
    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { _id } = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('events').deleteOne({ _id });
    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 