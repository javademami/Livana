"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // فرض بر این است که کامپوننت Textarea موجود است
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../../components/Header";

// Clerk imports
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";

export default function UserProfilePage() {
  const { user } = useUser(); // اطلاعات کاربر را از Clerk دریافت می‌کند
  const [isEditing, setIsEditing] = useState(false);
  
  // وضعیت برای مدیریت آگهی‌ها
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null); // برای نگهداری آگهی در حال ویرایش
  const [newImage, setNewImage] = useState(null); // وضعیت برای نگهداری تصویر جدید

  useEffect(() => {
    const fetchKarbars = async () => {
      try {
        const response = await fetch(`/api/karbar?userId=${user.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data.karbars);
      } catch (error) {
        console.error("Failed to fetch Property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchKarbars();
    }
  }, [user?.id]);

  // وضعیت برای مدیریت اطلاعات کاربر
  const [userInfo, setUserInfo] = useState({
    name: user?.fullName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    phone: "123-456-7890", // می‌توانید شماره تماس را به مدل کاربر اضافه کنید
    bio: "Real estate enthusiast and property manager.",
    address: "123 Main St, Springfield, USA",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    if (editingItem) {
      // بارگذاری تصویر جدید در صورت وجود
      if (newImage) {
        const imageUrl = await uploadImage(newImage); // بارگذاری تصویر و دریافت URL
        editingItem.imageUrl = imageUrl; // به‌روزرسانی URL تصویر
      }

      const response = await fetch(`/api/karbar?id=${editingItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
      } else {
        console.error("Failed to update item");
      }
    }
    setEditingItem(null);
    setIsEditing(false);
    setNewImage(null); // ریست کردن تصویر جدید
  };

  const handleDeleteItem = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/karbar?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file); // ذخیره فایل انتخاب شده
    }
  };

  // تابع برای بارگذاری تصویر به Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_uploads"); // استفاده از preset که در فایل env گذاشتید

    const response = await fetch("https://api.cloudinary.com/v1_1/dutfn2viv/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url; // URL تصویر بارگذاری شده را برمی‌گرداند
  };

  const handleCancelEdit = () => {
    setEditingItem(null); // برگرداندن به حالت اصلی
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4">
      <Header />

      <SignedIn>
        <h1 className="text-4xl font-bold mb-8 py-8">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <img
                    src={user?.imageUrl || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto"
                  />

                  <p><strong>Name:</strong> {userInfo.name}</p>
                  <p><strong>Email:</strong> {userInfo.email}</p>
                  <p><strong>Phone:</strong> {userInfo.phone}</p>
                  <p><strong>Bio:</strong> {userInfo.bio}</p>
                  <p><strong>Address:</strong> {userInfo.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>User Property</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul className="space-y-4">
                    {items.length === 0 ? (
                      <p>No Propertys found.</p>
                    ) : (
                      items.map((item) => (
                        <li
                          key={item._id}
                          className="flex items-center justify-between border-b pb-4"
                        >
                          <div className="flex items-center">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-16 h-16 rounded-md mr-4"
                            />
                            <div>
                              <h3 className="text-lg font-semibold">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button
                              onClick={() => handleEditItem(item)}
                              variant="outline"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteItem(item._id)}
                              variant="danger"
                            >
                              Delete
                            </Button>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </CardContent>
            </Card>

            {isEditing && editingItem && (
              <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-4">Edit Property</h2>
                <div className="mb-4">
                  <strong>Title:</strong>
                  <Input
                    name="title"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="Title"
                  />
                </div>
                <div className="mb-4">
                  <strong>Description:</strong>
                  <Textarea
                    name="description"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    placeholder="Description"
                  />
                </div>
                <div className="mb-4">
                  <strong>Property Type:</strong>
                  <Input
                    name="propertyType"
                    value={editingItem.propertyType}
                    onChange={(e) => setEditingItem({ ...editingItem, propertyType: e.target.value })}
                    placeholder="Property Type"
                  />
                </div>
                <div className="mb-4">
                  <strong>Bedrooms:</strong>
                  <Input
                    name="bedrooms"
                    type="number"
                    value={editingItem.bedrooms}
                    onChange={(e) => setEditingItem({ ...editingItem, bedrooms: e.target.value })}
                    placeholder="Number of Bedrooms"
                  />
                </div>
                {/* New Bathrooms Field */}
                <div className="mb-4">
                  <strong>Bathrooms:</strong>
                  <Input
                    name="bathrooms"
                    type="number"
                    value={editingItem.bathrooms}
                    onChange={(e) => setEditingItem({ ...editingItem, bathrooms: e.target.value })}
                    placeholder="Number of Bathrooms"
                  />
                </div>
                {/* New Address Field */}
                <div className="mb-4">
                  <strong>Address:</strong>
                  <Input
                    name="address"
                    value={editingItem.address}
                    onChange={(e) => setEditingItem({ ...editingItem, address: e.target.value })}
                    placeholder="Address"
                  />
                </div>
                <div className="mb-4">
                  <strong>Price:</strong>
                  <Input
                    name="price"
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    placeholder="Price"
                  />
                </div>
                <div className="mb-4">
                  <strong>Image:</strong>
                  <input type="file" onChange={handleImageUpload} />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleSave} variant="primary">Save</Button>
                  <Button onClick={handleCancelEdit} variant="outline">Cancel</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
