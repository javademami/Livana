import { NextResponse } from 'next/server';
import clientPromise from '../../../utils/mongodb'; // مسیر درست به فایل mongodb.js

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db('realEstate'); // نام پایگاه داده شما

  const {
    title,
    description,
    propertyType,
    bedrooms,
    bathrooms,
    price,
    address,
    city,
    zipCode,
    imageUrl, // اضافه کردن URL تصویر
    userId, // اضافه کردن userId
  } = await req.json();

  try {
    // افزودن ملک به مجموعه
    const property = await db.collection('properties').insertOne({
      title,
      description,
      propertyType,
      bedrooms,
      bathrooms,
      price,
      address,
      city,
      zipCode,
      imageUrl, // ذخیره URL تصویر
      userId, // ذخیره userId
      createdAt: new Date(),
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add property' }, { status: 500 });
  }
}
