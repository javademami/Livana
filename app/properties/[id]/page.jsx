"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '../../../components/Header'; // اطمینان حاصل کنید که مسیر صحیح است

const PropertyDetails = ({ params }) => {
  const { id } = params; // دریافت شناسه ملک از URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch property');
        }
        const data = await res.json();
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="container mx-auto px-4 flex flex-col">
      {/* کامپوننت هدر */}
      <Header />
      
      <div className="flex mt-4">
        {/* قسمت 60 درصد */}
        <div className="w-3/5 p-4">
          <Card>
            <CardHeader>
              <CardTitle>{property.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={property.imageUrl || 'https://via.placeholder.com/150'} 
                alt={property.title} 
                className="w-full h-48 object-cover" 
              />
              <p className="text-2xl font-bold my-2">${property.price}/month</p>
              <p>{property.description}</p>
              <p className="mt-4">Property Type: {property.propertyType}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Address: {property.address}, {property.city}, {property.zipCode}</p>
            </CardContent>
          </Card>
          <Button className="mt-4" onClick={() => window.history.back()}>Back</Button>
        </div>

        {/* قسمت 40 درصد */}
        <div className="w-2/5 p-4 bg-gray-200">
          {/* اینجا فضای خالی برای کامپوننت چت با صاحب ملک */}
          <h2 className="text-xl font-bold">Chat with the Owner</h2>
          <p>This space will be for chatting with the property owner.</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
