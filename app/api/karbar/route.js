import dbConnect from './../../../utils/mongoUser'; // تابع اتصال به دیتابیس
import Karbar from './../../../models/karbar'; // مدل Mongoose برای Karbar

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  await dbConnect(); // اتصال به دیتابیس

  try {
    const karbars = await Karbar.find({ userId });
    return new Response(JSON.stringify({ karbars }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching karbars:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch karbars" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await dbConnect(); // اتصال به دیتابیس

  try {
    await Karbar.findByIdAndDelete(id);
    return new Response(null, { status: 204 }); // 204 No Content
  } catch (error) {
    console.error("Error deleting karbar:", error);
    return new Response(JSON.stringify({ error: "Failed to delete karbar" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(req) {
  const { searchParams } = new URL(req.url); // دریافت query params
  const id = searchParams.get("id"); // دریافت id از query params
  let updateData;

  try {
    updateData = await req.json(); // دریافت داده‌های به‌روز شده از درخواست
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await dbConnect(); // اتصال به دیتابیس

  try {
    const updatedKarbar = await Karbar.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedKarbar) {
      return new Response(JSON.stringify({ error: "Karbar not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(updatedKarbar), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating karbar:", error);
    return new Response(JSON.stringify({ error: "Failed to update karbar" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
