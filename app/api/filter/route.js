import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // مقادیر دریافتی از URL را لاگ می‌گیریم
    console.log("Received search params: ", searchParams.toString());

    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');

    // مطمئن شوید که مقادیر به درستی دریافت می‌شوند
    console.log({ location, propertyType, minPrice, maxPrice, bedrooms, bathrooms });

    // اینجا منطق فیلتر داده‌ها از دیتابیس یا هر منبع دیگری است

    const filteredProperties = []; // فرضاً داده‌ها از دیتابیس دریافت شده‌اند.

    return NextResponse.json({ properties: filteredProperties });
  } catch (error) {
    console.error("Error fetching filtered properties:", error);
    return NextResponse.error(new Error('Failed to fetch filtered properties'), { status: 500 });
  }
}
