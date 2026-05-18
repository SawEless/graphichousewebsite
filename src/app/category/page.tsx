'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CategoryFilter from './CategoryFilter';

interface Service {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
  images?: string[];
}

interface Category {
  id: string;
  slug: string;
  name: string;
  icon?: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://graphichousefinal.onrender.com/api';
    
    Promise.all([
      fetch(`${apiUrl}/categories`).then(r => r.json()).catch(() => []),
      fetch(`${apiUrl}/services`).then(r => r.json()).catch(() => [])
    ])
      .then(([cats, svcs]) => {
        setCategories(Array.isArray(cats) ? cats : []);
        setServices(Array.isArray(svcs) ? svcs : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
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
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/"><span className="text-2xl font-bold text-red-600">Graphic House</span></Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition">About</Link>
            <Link href="/category" className="text-red-600 font-semibold border-b-2 border-red-600 pb-1">Services</Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition">Contact</Link>
          </nav>
          <Link href="/contact" className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition font-medium">Get Started</Link>
        </div>
      </header>
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Print Solutions for Every Need</h1>
        <p className="text-lg text-red-100 max-w-2xl mx-auto">Explore our wide range of high-quality printing products and services.</p>
      </section>
      <main className="container mx-auto px-4 py-12 min-h-screen">
        {services.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🖨️</div>
            <p className="text-xl text-gray-600 mb-6">No services available at the moment.</p>
            <Link href="/contact" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold">Contact Us</Link>
          </div>
        ) : (
          <CategoryFilter categories={categories} services={services} />
        )}
      </main>
      <footer className="bg-gray-900 text-white mt-16 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="text-2xl font-bold text-red-600 mb-3">Graphic House</div>
            <p className="text-gray-400 mt-3 text-sm max-w-xs">Professional printing &amp; design services since 2018.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-red-400">CONTACT US</h4>
            <p className="text-gray-400 text-sm">Phone: 021-547547 | 9842153371</p>
            <p className="text-gray-400 text-sm">Address: Sundarharaincha, Biratchowk</p>
            <p className="text-gray-400 text-sm">graphichouse2075@gmail.com</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-red-400">Connect With Us</h4>
            <a href="https://www.facebook.com/graphichousebiratchowk/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-sm block">Facebook</a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">© 2024 Graphic House. All rights reserved.</div>
      </footer>
    </>
  );
