"use client";
import React from "react";
import Image from "next/image";
import { Tag } from "lucide-react";
import { Product } from "./types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%234B5563'/%3E%3Ctext x='50%25' y='50%25' fill='%239CA3AF' font-size='24' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

  // Correctly access photo data (not an array)
  const imageUrl = product.attributes.Photo?.data?.attributes?.url;
  const finalImageUrl = imageUrl
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "https://strapi-graphichouse-v1.onrender.com"}${imageUrl}`
    : placeholderImage;

  const basePrice = product.attributes.Price;

  const sortedPricing = product.pricing
    .filter((p) => p && p.attributes && typeof p.attributes.min === "number")
    .sort((a, b) => a.attributes.min - b.attributes.min);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-yellow-400/50 border border-gray-700 flex flex-col">
      <div className="relative aspect-square">
        <Image
          src={finalImageUrl}
          alt={product.attributes.Name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-300 hover:scale-105 object-cover"
          priority
        />
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2 truncate">
            {product.attributes.Name}
          </h2>
          <p className="text-gray-300 mb-4 line-clamp-2">{product.attributes.Description}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-xl shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold text-yellow-400">Base Price</span>
            <div className="flex items-center">
              <Tag className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold text-yellow-400">
                NPR {basePrice.toLocaleString("en-NP")}
              </span>
            </div>
          </div>
          {sortedPricing.length > 0 && (
            <div className="mt-3">
              <h3 className="text-lg font-semibold mb-2 text-yellow-300">Quantity Pricing:</h3>
              <ul className="space-y-2">
                {sortedPricing.map((price, index) => (
                  <li key={index} className="flex justify-between text-sm bg-gray-700 p-2 rounded-lg shadow-sm">
                    <span className="text-yellow-200 font-medium">
                      {price.attributes.min}
                      {price.attributes.max ? `-${price.attributes.max}` : "+"}
                    </span>
                    <span className="font-bold text-yellow-300">
                      NPR {price.attributes.Price.toLocaleString("en-NP")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
