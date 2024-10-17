'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, Building2, Building } from 'lucide-react'
import Header from '../../components/Header' // Adjust the path according to your structure

export default function RentPage() {
  const [priceRange, setPriceRange] = useState([500, 5000])
  

  const propertyTypes = ['Apartment', 'House', 'Condo']
  const bedrooms = ['1', '2', '3+']

  const properties = [
    { id: 1, title: '2-Bedroom Apartment in Downtown', price: 1500, description: 'Modern apartment with great city views', image: 'https://bilder.hemnet.se/images/itemgallery_cut/90/51/9051aa8d7a98a6a51bafad572e07be5b.jpg?height=200&width=300' },
    { id: 2, title: 'Cozy Studio near the Park', price: 1000, description: 'Perfect for singles or couples', image: 'https://bilder.hemnet.se/images/itemgallery_cut/8f/94/8f945c189c3541964c9a5de9eed5951c.jpg?height=200&width=300' },
    { id: 3, title: 'Spacious 3-Bedroom House', price: 2500, description: 'Ideal for families, includes a backyard', image: 'https://bilder.hemnet.se/images/itemgallery_cut/9a/c5/9ac5fdb94ae5e55852bf7e96c82808ea.jpg?height=200&width=300' },
  ]

  return (
    <div className="container mx-auto px-4 ">
      <Header />
      <h1 className="text-4xl font-bold mb-4 mt-8">Find Your Ideal Property to Rent</h1> {/* Added margin-top */}
      <p className="text-xl mb-8">Explore our curated listings and find the perfect place for you.</p>

      {/* Search Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input type="text" placeholder="Location" />
          <select className="w-full p-2 border rounded">
            <option value="">Property Type</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
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
        <Button className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Property Type</h3>
              {propertyTypes.map(type => (
                <div key={type} className="flex items-center space-x-2 mb-2">
                  <Checkbox id={type} />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}

              <h3 className="font-semibold mb-2 mt-4">Price Range</h3>
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

              <h3 className="font-semibold mb-2 mt-4">Bedrooms</h3>
              {bedrooms.map(bedroom => (
                <div key={bedroom} className="flex items-center space-x-2 mb-2">
                  <Checkbox id={`bedroom-${bedroom}`} />
                  <label htmlFor={`bedroom-${bedroom}`}>{bedroom}</label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Property Listings */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {properties.map(property => (
              <Card key={property.id}>
                <CardHeader>
                  <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{property.title}</CardTitle>
                  <p className="text-2xl font-bold my-2">${property.price}/month</p>
                  <p className="text-gray-600">{property.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="my-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Renters Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'John Doe', text: 'I found my dream apartment through Livana. The process was smooth and easy!' },
            { name: 'Jane Smith', text: 'The filters helped me narrow down exactly what I was looking for. Highly recommend!' },
            { name: 'Mike Johnson', text: 'Great selection of properties and excellent customer service. Will use again!' },
          ].map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to List Your Property?</h2>
        <p className="mb-6">Join our platform and connect with potential renters today!</p>
        <div className="flex justify-center space-x-4">
          <Button>
            <Building2 className="mr-2 h-4 w-4" /> List Your Property
          </Button>
          <Button variant="outline">
            <Building className="mr-2 h-4 w-4" /> Contact Us
          </Button>
        </div>
      </section>
    </div>
  )
}
