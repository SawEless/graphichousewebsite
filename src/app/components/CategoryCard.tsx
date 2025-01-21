import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Category } from "./types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  if (!category || !category.attributes) {
    console.error("Invalid category data:", category);
    return null;
  }

  const photoData = category.attributes.Photo?.data;
  const imageUrl = photoData?.attributes?.url
    ? `https://strapi-graphichouse-v1.onrender.com${photoData.attributes.url}`
    : "/logo.jpg";

  const productNames = category.attributes.products?.data?.map(
    (product) => product.attributes?.Name
  ) || [];

  return (
    <div className="bg-black shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer group text-center">
      <Link href={`/category/${category.id}/products`} className="block">
        <div className="relative w-full h-56">
          <Image
            src={imageUrl}
            alt={photoData?.attributes?.alternativeText || category.attributes.Name || "Category Image"}
            fill
            style={{ objectFit: "cover" }}
            className="opacity-80 group-hover:opacity-90 transition duration-300"
          />
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-yellow-400">
            {category.attributes.Name || "Unnamed Category"}
          </h3>
          <div className="text-sm text-gray-400">
            {productNames.length > 0 ? (
              <span className="text-yellow-500 font-semibold">Products Available</span>
            ) : (
              <span className="text-red-500 font-semibold">No Products Available</span>
            )}
          </div>
          <div className="inline-flex items-center justify-center text-yellow-400 hover:text-yellow-600 transition duration-300 cursor-pointer">
            View Products
            <ChevronRight className="ml-1 w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
