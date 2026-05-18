'use client';
import { useState, useEffect } from 'react';

export default function CategoryPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://graphichousefinal.onrender.com/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <div key={service._id} className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold">{service.name}</h2>
            <p className="text-gray-400 my-2">{service.description}</p>
            <p className="text-orange-500 font-bold text-xl">${service.basePrice}</p>
            <p className="text-gray-500">Category: {service.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}