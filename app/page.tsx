import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Header from './../components/Header'

export default function Home() {
  return (
    <>
    <div className='container mx-auto px-4 py-1'><Header /></div>
      
      <main>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Livana
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your trusted partner in real estate. We offer top-notch property rentals, listings, and expert consulting services.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Our Services</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {['Property Rentals', 'Listing Properties', 'Real Estate Consulting'].map((service, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg bg-white dark:bg-gray-950">
                  <h3 className="text-xl font-bold">{service}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    We provide top-notch {service.toLowerCase()} services tailored to your needs.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">What Our Clients Say</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                { name: 'Alice Johnson', text: 'Livana made finding my dream home a breeze!' },
                { name: 'Bob Smith', text: 'Their consulting services are unparalleled.' },
                { name: 'Carol Davis', text: 'Listing my property with Livana was the best decision I made.' },
              ].map((testimonial, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 italic">"{testimonial.text}"</p>
                  <p className="font-semibold">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore our properties or get in touch with us today.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                  Explore Properties
                </Button>
                <Button variant="outline">
                  Contact Us Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}