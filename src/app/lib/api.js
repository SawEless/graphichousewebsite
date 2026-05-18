// Your WORKING custom backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://graphichousefinal.onrender.com/api';

// Simple fetch wrapper
const fetchAPI = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
};

// Get all categories (from your services)
export const fetchProductCategories = async () => {
  try {
    const services = await fetchAPI('/services');
    
    // Group services by category
    const categoriesMap = new Map();
    services.forEach(service => {
      if (!categoriesMap.has(service.category)) {
        categoriesMap.set(service.category, {
          id: service.category,
          name: getCategoryName(service.category),
          slug: service.category,
          description: `${getCategoryName(service.category)} services`,
          count: 1
        });
      } else {
        categoriesMap.get(service.category).count++;
      }
    });
    
    return { data: Array.from(categoriesMap.values()) };
  } catch (error) {
    console.error('Error:', error);
    return { data: [] };
  }
};

// Get products by category
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const services = await fetchAPI('/services');
    const filtered = services.filter(s => s.category === categoryId);
    return { data: filtered };
  } catch (error) {
    return { data: [] };
  }
};

// Get single category
export const fetchProductCategory = async (categoryId) => {
  try {
    const services = await fetchAPI('/services');
    const categoryServices = services.filter(s => s.category === categoryId);
    return {
      data: {
        id: categoryId,
        name: getCategoryName(categoryId),
        slug: categoryId,
        products: categoryServices
      }
    };
  } catch (error) {
    throw error;
  }
};

// Get single product
export const fetchProductDetails = async (productId) => {
  const service = await fetchAPI(`/services/${productId}`);
  return { data: service };
};

// Get pricing
export const fetchProductPricing = async (productId) => {
  const service = await fetchAPI(`/services/${productId}`);
  return { data: service.bulkPrices || [] };
};

// Helper: Category names
function getCategoryName(slug) {
  const names = {
    'printing': 'Printing Services',
    't-shirt': 'T-Shirt Printing',
    'flags': 'Flags & Banners',
    'wedding-cards': 'Wedding Cards',
    'keyrings': 'Keyrings',
    'school-vest': 'School Vest',
    'flex-photos': 'Flex Photos',
    'digital-boards': 'Digital Boards',
    'neon-boards': 'Neon Boards'
  };
  return names[slug] || slug;
}