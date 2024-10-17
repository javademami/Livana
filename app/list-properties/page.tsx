"use client"; // اعلام اینکه این کامپوننت یک Client Component است

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from '../../components/Header'; // Adjust the path according to your structure
import { Upload } from 'lucide-react'; // اضافه کردن Import
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

// Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters long" }),
  propertyType: z.string(),
  bedrooms: z.number().min(1),
  bathrooms: z.number().min(1),
  price: z.number().min(1),
  address: z.string(),
  city: z.string(),
  zipCode: z.string(),
});

export default function ListPropertyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    address: "",
    city: "",
    zipCode: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setFormData(values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // متد برای آپلود تصویر به Cloudinary
  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_uploads'); // استفاده از CLOUDINARY_UPLOAD_PRESET

    const response = await fetch('https://api.cloudinary.com/v1_1/dutfn2viv/image/upload', { // استفاده از CLOUDINARY_CLOUD_NAME
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.secure_url; // URL تصویر آپلود شده را برمی‌گرداند
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let imageUrl = null;

      // چک کردن اینکه آیا کاربر عکسی انتخاب کرده است
      if (previewImage) {
        const file = previewImage as unknown as File; // تبدیل رشته به فایل
        imageUrl = await uploadImage(file); // بارگذاری تصویر به Cloudinary
      }

      // ارسال اطلاعات ملک به API
      const response = await fetch('/api/add-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, imageUrl }), // ارسال مقادیر فرم و URL تصویر
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Property added:', result);
        setIsSubmitted(true); // تغییر وضعیت برای نمایش پیام موفقیت
      } else {
        console.error('Failed to add property');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // اینجا باید به فایل واقعی تبدیل کنید
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-1">
      <Header />
      <SignedIn>
        <h1 className="text-4xl font-bold mb-12 py-10">List Your Property</h1>
        {isSubmitted ? (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your property has been listed successfully. We'll review your listing and get back to you soon.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="flex gap-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Cozy 2-bedroom apartment in downtown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your property..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a property type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per Month</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex space-x-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel>Upload Image</FormLabel>
                      <Input type="file" accept="image/*" onChange={handleImageUpload} />
                      {previewImage && (
                        <div className="mt-4">
                          <img src={previewImage} alt="Preview" className="h-64 w-full object-cover rounded-md" />
                        </div>
                      )}
                    </div>
                    <Button type="submit">Submit Listing</Button>
                  </CardContent>
                </Card>
              </form>
            </Form>
            {previewImage && (
              <Card className="w-1/2">
                <CardHeader>
                  <CardTitle>Image Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={previewImage} alt="Property Preview" className="object-cover w-full h-64 rounded-lg" />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
