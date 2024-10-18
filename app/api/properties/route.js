import connectToDatabase from './../../../utils/mongoConnect';
import Property from './../../../models/Property';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();  // اتصال به دیتابیس
    const properties = await Property.find({});  // بازیابی املاک از دیتابیس
    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error retrieving properties:', error);
    return NextResponse.json({ message: 'Error retrieving properties' }, { status: 500 });
  }
}
