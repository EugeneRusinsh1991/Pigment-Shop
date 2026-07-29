import { z } from 'zod';

export * from './validationUtils';

export const LocalizedStringSchema = z.object({
  uk: z.string().optional().default(''),
  ru: z.string().optional().default(''),
  en: z.string().optional().default(''),
}).catchall(z.string().optional());

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;

export const CatalogItemSchema = z.object({
  id: z.string(),
  label: z.union([z.string(), LocalizedStringSchema]).default(''),
  brand: z.string().optional().default(''),
  price: z.coerce.number().default(0),
  sku: z.string().optional().default(''),
  discountPercent: z.coerce.number().default(0),
  isNew: z.boolean().default(false),
  description: z.union([z.string(), LocalizedStringSchema]).optional(),
  image: z.string().optional().default(''),
  images: z.array(z.string()).nullish().transform((val) => val ?? []),
  stock: z.coerce.number().default(0),
  sold: z.coerce.number().default(0),
  category: z.string().default(''),
  categoryId: z.string().nullish().default(null),
  subcategory: z.string().default(''),
  isCategory: z.boolean().default(false),
  active: z.boolean().default(true),
});

export type CatalogItem = z.infer<typeof CatalogItemSchema>;

export const CartItemSchema = z.object({
  id: z.string(),
  productId: z.string().optional(),
  label: z.string().default(''),
  price: z.coerce.number().default(0),
  qty: z.coerce.number().int().positive().default(1),
  image: z.string().optional().default(''),
  icon: z.string().optional().default(''),
  selectedVariations: z.record(z.string(), z.unknown()).optional().default({}),
  itemTotal: z.coerce.number().optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

export const UserRoleSchema = z.enum(['admin', 'customer', 'user', 'visitor']).default('customer');

export const UserProfileSchema = z.object({
  uid: z.string(),
  email: z.string().optional().default(''),
  displayName: z.string().optional().default(''),
  phoneNumber: z.string().optional().default(''),
  address: z.string().optional().default(''),
  role: UserRoleSchema,
  authToken: z.string().optional(),
  sessionStatus: z.enum(['authenticated', 'unauthenticated', 'loading']).default('unauthenticated'),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const OrderStatusSchema = z.enum(['pending', 'processing', 'completed', 'cancelled']).default('pending');

export const OrderItemSchema = z.object({
  id: z.string(),
  productId: z.string().optional(),
  title: z.string().default(''),
  price: z.coerce.number().default(0),
  quantity: z.coerce.number().int().positive().default(1),
  totalPrice: z.coerce.number().default(0),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

export const ShippingPayloadSchema = z.object({
  fullName: z.string().default(''),
  phone: z.string().default(''),
  city: z.string().default(''),
  address: z.string().default(''),
  notes: z.string().optional().default(''),
});

export type ShippingPayload = z.infer<typeof ShippingPayloadSchema>;

export const OrderSchema = z.object({
  id: z.string(),
  status: OrderStatusSchema,
  lineItems: z.array(OrderItemSchema).nullish().transform((val) => val ?? []),
  totalAmount: z.coerce.number().default(0),
  customer: ShippingPayloadSchema.optional(),
  createdAt: z.string().optional(),
});

export type Order = z.infer<typeof OrderSchema>;
