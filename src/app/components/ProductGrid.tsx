

"use client";
import React from 'react';
import { Printer } from 'lucide-react';
import { Product } from './types'; // Import shared Product type
import ProductCard from './ProductCard'; // Import ProductCard component

interface ProductGridProps {
  products: Product[]; // Use shared Product type
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-12 text-center max-w-md mx-auto">
        <Printer className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        <p className="text-2xl text-yellow-300 mb-6">No products available in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
