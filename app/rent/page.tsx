"use client";

import { useEffect, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function RentPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/properties');
      if (!res.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await res.json();
      if (!Array.isArray(data.properties)) {
        throw new Error('API response is not an array');
      }
      setProperties(data.properties);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    // پارامترها را به API /api/filter ارسال می‌کنیم
    const params = new URLSearchParams({
      location,
      propertyType,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      bedrooms: bedrooms?.toString() || '',
      bathrooms: bathrooms?.toString() || ''
    });

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/filter?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to fetch filtered properties');
      }
      const data = await res.json();
      setProperties(data.properties);
    } catch (error) {
      console.error('Error fetching filtered properties:', error);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Header />
      <h1 className="text-4xl font-bold mb-4 mt-8">Find Your Ideal Property to Rent</h1>
      <p className="text-xl mb-8">Explore our curated listings and find the perfect place for you.</p>

      {/* Search Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Input Location */}
          <Input 
            type="text" 
            placeholder="Location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Select Property Type */}
          <select 
            className="w-full p-2 border rounded"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
          </select>

          {/* Price Range Slider */}
          <div className="flex items-center space-x-4">
            <span>${priceRange[0]}</span>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="flex-grow"
            />
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Bedrooms and Bathrooms Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Bedrooms */}
          <Input 
            type="number"
            placeholder="Bedrooms"
            value={bedrooms || ''}
            onChange={(e) => setBedrooms(Number(e.target.value))}
          />

          {/* Bathrooms */}
          <Input 
            type="number"
            placeholder="Bathrooms"
            value={bathrooms || ''}
            onChange={(e) => setBathrooms(Number(e.target.value))}
          />
        </div>

        {/* Search Button */}
        <Button className="w-full md:w-auto" onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          {loading && <p>Loading properties...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <Card key={property._id}>
                    <CardHeader>
                      <Link href={`/properties/${property._id}`}>
                        <img 
                          src={property.imageUrl || 'https://via.placeholder.com/150'} 
                          alt={property.title} 
                          className="w-full h-48 object-cover rounded-t-lg" 
                          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }} 
                        />
                      </Link>
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{property.title}</CardTitle>
                      <p className="text-2xl font-bold my-2">${property.price}/month</p>
                      <p className="text-gray-600">{property.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/properties/${property._id}`}>
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p>No properties found. Try adjusting your search criteria.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
