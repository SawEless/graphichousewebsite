
'use client';

import { useState } from 'react';
import Link from 'next/link';

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

interface Props {
  categories: Category[];
  services: Service[];
}

export default function CategoryFilter({ categories, services }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <>
      {/* Category filter buttons */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full font-medium border transition ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
            }`}
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2 rounded-full font-medium border transition ${
                selectedCategory === cat.slug
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No services in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group border border-gray-100"
            >
              <div className="h-48 bg-gray-100 overflow-hidden relative">
                {service.images && service.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-50">
                    <svg className="w-16 h-16 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v6.081m10.5 0h-10.5" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-1 rounded">
                  {service.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-1">{service.name}</h3>
                {service.description && (
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{service.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-bold text-lg">
                    NPR {service.basePrice?.toLocaleString()}
                  </span>
                  <Link
                    href="/contact"
                    className="text-sm bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 transition"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center bg-red-50 rounded-2xl py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Can&apos;t find what you&apos;re looking for?</h2>
        <p className="text-gray-500 mb-6">Our team is here to help with custom printing solutions.</p>
        <Link href="/contact" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold text-lg">
          Contact Us
        </Link>
      </div>
    </>
  );
}
