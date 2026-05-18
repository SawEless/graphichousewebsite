'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Menu, X, Briefcase, Globe, Printer, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://graphichousefinal.onrender.com/api';
    fetch(`${apiUrl}/services`)
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Group services by category
  const servicesByCategory = services.reduce((acc: any, service: any) => {
    const cat = service.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header - YOUR ORIGINAL DESIGN */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-500">Logo</div>
        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-300 hover:text-orange-500 transition duration-300">Home</Link>
          <Link href="#" className="text-gray-300 hover:text-orange-500 transition duration-300">About</Link>
          <Link href="/services" className="text-gray-300 hover:text-orange-500 transition duration-300">Services</Link>
          <Link href="#" className="text-gray-300 hover:text-orange-500 transition duration-300">Contact</Link>
        </nav>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">Get Started</button>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="text-orange-500" /> : <Menu className="text-orange-500" />}
        </button>
      </header>

      {/* Mobile Menu - YOUR ORIGINAL DESIGN */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-800 p-4"
        >
          <nav className="flex flex-col space-y-4">
            <Link href="#" className="text-gray-300 hover:text-orange-500 transition duration-300">Home</Link>
            <Link href="#" className="text-gray-300 hover:text-orange-500 transition duration-300">About</Link>
            <Link href="/services" className="text-gray-300 hover:text-orange-500 transition duration-300">Services</Link>
            <Link href="#" className="text-gray-300 hover:text-orange-500 transition duration-300">Contact</Link>
          </nav>
        </motion.div>
      )}

      {/* Hero Section - YOUR ORIGINAL DESIGN */}
      <motion.section className="container mx-auto px-4 py-20 text-center" {...fadeIn}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Transforming Ideas into Stunning Visuals</h1>
        <p className="text-xl text-gray-400 mb-8">Elevate your brand with our expert design services</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300"
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* DYNAMIC SERVICES SECTION - This now loads from your backend */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2 className="text-3xl font-bold text-center mb-12 text-orange-500" {...fadeIn}>
          Our Services
        </motion.h2>
        
        {loading ? (
          <div className="text-center py-12">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p>No services available. Please check back later.</p>
            <p className="text-sm mt-2 text-gray-400">Admin: Add services at graphichousefinal.onrender.com</p>
          </div>
        ) : (
          Object.keys(servicesByCategory).map(category => (
            <div key={category} className="mb-16">
              <h3 className="text-2xl font-semibold mb-8 text-orange-400 capitalize">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {servicesByCategory[category].map((service: any, idx: number) => (
                  <motion.div
                    key={service._id}
                    className="bg-gray-800 p-6 rounded-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    {service.images && service.images[0] ? (
                      <img src={service.images[0]} alt={service.name} className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
                    ) : (
                      <div className="mb-4"><Printer className="w-12 h-12 text-orange-500 mx-auto" /></div>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-400 mb-2">{service.description}</p>
                    <p className="text-orange-500 font-bold">${service.basePrice}</p>
                    <p className="text-gray-500 text-sm mt-2 capitalize">Category: {service.category}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Keep ALL your remaining original sections exactly as they are (Stats, Testimonials, Team, CTA, Footer) */}
      {/* ... rest of your original homepage code ... */}
    </div>
  );
}
