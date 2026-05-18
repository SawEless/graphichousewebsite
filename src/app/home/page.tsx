'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Service {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
  images?: string[];
}

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://graphichousefinal.onrender.com/api/services')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading services...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <div className="text-xl">Error loading services</div>
          <div className="text-sm mt-2">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-500">Graphic House</div>
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-300 hover:text-orange-500">Home</a>
          <a href="/about" className="text-gray-300 hover:text-orange-500">About</a>
          <a href="/services" className="text-gray-300 hover:text-orange-500">Services</a>
          <a href="/contact" className="text-gray-300 hover:text-orange-500">Contact</a>
        </nav>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Get Started</button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Transforming Ideas into Stunning Visuals</h1>
        <p className="text-xl text-gray-400 mb-8">Elevate your brand with our expert design services</p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold">
          Get Started
        </button>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-500">Our Services</h2>
        
        {services.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p>No services available. Please check back later.</p>
            <p className="text-sm mt-2">Admin: Add services at graphichousefinal.onrender.com</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service._id} className="bg-gray-800 p-6 rounded-lg text-center">
                {service.images && service.images[0] && (
                  <img 
                    src={service.images[0]} 
                    alt={service.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-400 mb-2">{service.description}</p>
                <p className="text-orange-500 font-bold">${service.basePrice}</p>
                <p className="text-gray-500 text-sm mt-2">Category: {service.category}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-gray-400">
        <p>&copy; Graphic House. All rights reserved.</p>
      </footer>
    </div>
  );
}
