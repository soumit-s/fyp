import { z } from "zod";

export interface Item {
  id?: string;
  name: string;
  rating: number;
  numRatings: number;
  price: string;
  imgUrl: string;
  duration: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;

  // Address details
  address: string;
  state: string;
  province: string;
  country: string;
  pinCode: number;

  avatarUrl: string;
  isComplete: boolean;
}

export const productCategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  isActive: z.string(),
});

export type ProductCategory = z.infer<typeof productCategorySchema>;

export const productSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  remainingStock: z.number(),
  dailyPrice: z.number(),
  ratingAverage: z.number(),
  ratingCount: z.number(),
  isWishlisted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;

export interface Wishlist {
  id: string;
  product: Product;
}

export interface CartItem {
  id: number;
  product: Product;
  dailyPrice: number | null;
  securityDeposit: number | null;
  createdAt: string;
  quantity: number;
}

export interface Cart {
  id: number;
  cartItems: CartItem[];
}