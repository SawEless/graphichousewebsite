import axios from 'axios';

const API_URL = 'https://strapi-graphichouse-v1.onrender.com/api';
const TOKEN = '1c93685b4cee2d08d18d573f22cc9f6f7fdf052c6058d5a639354e2fd855fa52291b03afe2025521ccfbb1519e2b2b17ef9c6cd5c4512657ee0b548596817d759a331d298e5667c727b3dd5f533e98d22250fc20f21f68363b8c960406c3906921e170d8e171783ce2aa8e51f7a413cc839ee693dc20861478c11a20643eff1d'
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchProductCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories?populate=*');
    return response.data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(
      `/products?filters[category][id][$eq]=${categoryId}&populate=*`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchProductCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}?populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product category:', error);
    throw error;
  }
};

export const fetchProductDetails = async (productId) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}?populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export const fetchProductPricing = async (productId) => {
  try {
    const response = await axiosInstance.get(`/pricings?filters[products][id][$eq]=${productId}&populate=*`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product pricing:', error);
    throw error;
  }
};