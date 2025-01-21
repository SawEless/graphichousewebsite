// Shared Photo Type
export interface Photo {
    attributes: {
      url: string;
      alternativeText?: string;
    };
  }
  
  // Pricing Type for Products
  export interface Pricing {
    id: number;
    attributes: {
      min: number;
      max?: number;
      Price: number;
    };
  }
  
  // Product Type
  export interface Product {
    id: string;
    attributes: {
      Name: string;
      Description: string;
      Price: number;
      Photo?: {
        data?: Photo; // Single object for the photo
      };
    };
    pricing: Pricing[];
  }
  
  // Category Type
  export interface Category {
    id: string;
    attributes: {
      Name: string;
      Photo?: {
        data?: Photo; // Single object for the photo
      };
      products?: {
        data: Product[]; // Array of products in the category
      };
    };
  }
  