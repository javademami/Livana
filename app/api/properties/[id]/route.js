// app/api/properties/[id]/route.js
import connectToDatabase from './../../../../utils/mongoConnect';
import Property from './../../../../models/Property';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const property = await Property.findById(id);

    if (!property) {
      return new Response(JSON.stringify({ message: 'Property not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error('Error retrieving property:', error);
    return new Response(JSON.stringify({ message: 'Error retrieving property' }), { status: 500 });
  }
}
