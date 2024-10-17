"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"; // Import the switch component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../../components/Header"; // Adjust the path according to your structure

// Clerk imports
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";

export default function UserProfilePage() {
  const { user } = useUser(); // Get user information from Clerk
  const [isEditing, setIsEditing] = useState(false);

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Property Listing 1",
      description: "A beautiful 3-bedroom house.",
      image:
        "https://bilder.hemnet.se/images/itemgallery_cut/90/51/9051aa8d7a98a6a51bafad572e07be5b.jpg?height=200&width=300/100",
      active: true,
    },
    {
      id: 2,
      title: "Property Listing 2",
      description: "A cozy 2-bedroom apartment.",
      image:
        "https://bilder.hemnet.se/images/itemgallery_cut/8f/94/8f945c189c3541964c9a5de9eed5951c.jpg?height=200&width=300/100",
      active: false,
    },
  ]);

  // State for managing user information
  const [userInfo, setUserInfo] = useState({
    name: user?.fullName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    phone: "123-456-7890", // You may want to add phone to the user model in Clerk
    bio: "Real estate enthusiast and property manager.",
    address: "123 Main St, Springfield, USA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleToggleActive = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleEditItem = (id: number) => {
    // Logic to edit the item
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 ">
      <Header />

      <SignedIn>
        <h1 className="text-4xl font-bold mb-8 py-8">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                {/* Display the profile image from Clerk */}
                <img
                  src={user?.imageUrl || "https://via.placeholder.com/150"} // Fallback image
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto" // Center the image
                />

                {isEditing ? (
                  <>
                    <Input
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                    <Input
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    <Input
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                    />
                    <Input
                      name="bio"
                      value={userInfo.bio}
                      onChange={handleChange}
                      placeholder="Bio"
                    />
                    <Input
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                      placeholder="Address"
                    />
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Name:</strong> {userInfo.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {userInfo.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {userInfo.phone}
                    </p>
                    <p>
                      <strong>Bio:</strong> {userInfo.bio}
                    </p>
                    <p>
                      <strong>Address:</strong> {userInfo.address}
                    </p>
                  </>
                )}
                <div className="flex space-x-4">
                  <Button onClick={handleEditToggle} variant="outline">
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                  {isEditing && (
                    <Button onClick={handleSave} variant="primary">
                      Save Changes
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-md mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={item.active}
                        onCheckedChange={() => handleToggleActive(item.id)}
                      />
                      <Button
                        onClick={() => handleEditItem(item.id)}
                        variant="outline"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(item.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              <li>Listed a new property on October 1, 2024</li>
              <li>Updated property details on October 3, 2024</li>
              <li>Received a message from a potential renter on October 5, 2024</li>
              <li>User logged in on October 13, 2024</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button variant="danger">Delete Account</Button>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
