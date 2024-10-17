import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Target, Mail } from 'lucide-react';
import Header from '../../components/Header'; // Adjust the path according to your structure

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <h1 className="text-4xl font-bold mb-8 py-8">About Us</h1>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Livana</h2>
        <p className="text-lg mb-4">
          Livana is a leading real estate platform dedicated to connecting property owners with potential renters and buyers. Founded in 2010, we've been at the forefront of revolutionizing the way people find and list properties.
        </p>
        <p className="text-lg">
          Our mission is to make the process of finding a home or listing a property as seamless and stress-free as possible. We believe in transparency, innovation, and putting our users first in everything we do.
        </p>
      </section>

      {/* Our Team */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Jane Doe", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200" },
            { name: "John Smith", role: "CTO", image: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200" },
            { name: "Alice Johnson", role: "Head of Customer Relations", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200" },
          ].map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <img src={member.image} alt={member.name} className="w-full h-150 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vision and Goals & Achievements */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Vision and Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2" />
                Our Vision and Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                At Livana, we envision a world where finding the perfect home or investment property is a joyful and effortless experience. Our goals include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expanding our property listings to cover every corner of the country</li>
                <li>Implementing cutting-edge AI technology to provide personalized property recommendations</li>
                <li>Fostering a community of informed and satisfied users through educational resources and top-notch customer service</li>
              </ul>
            </CardContent>
          </Card>

          {/* Achievements and Successes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2" />
                Our Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Named "Best Real Estate Platform" by Tech Innovators Magazine in 2022</li>
                <li>Achieved 1 million active monthly users in 2023</li>
                <li>Successfully facilitated over 500,000 property transactions since our inception</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Us */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-6">
          We'd love to hear from you! Whether you have questions about our services or want to learn more about Livana, our team is here to help.
        </p>
        <Button asChild>
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4" /> Contact Us
          </Link>
        </Button>
      </section>
    </div>
  );
}
