export type UserRole = 'customer' | 'farmer' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  farm_name?: string;
  location?: string;
  created_at: string;
}

export type AnimalCategory = 'Bull' | 'Cow' | 'Goat' | 'Sheep' | 'Camel';
export type AnimalStatus = 'available' | 'sold';

export interface Animal {
  id: number;
  farmer_id: number;
  farmer_name?: string;
  farm_name?: string;
  location?: string;
  title: string;
  category: AnimalCategory;
  breed: string;
  age: string;
  weight: number; // in kg
  price: number; // total price
  total_shares: number; // e.g. 7 for cattle, 1 for goat/sheep
  available_shares: number;
  description: string;
  image: string;
  status: AnimalStatus;
  health_certified?: boolean;
  organic_fed?: boolean;
  teeth_count?: number;
  created_at?: string;
}

export type PurchaseType = 'whole' | 'share';
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type DeliveryStatus = 'processing' | 'farm_preparing' | 'slaughtered' | 'packaged' | 'shipping' | 'delivered';

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  customer_name?: string;
  customer_phone?: string;
  animal_id: number;
  animal_title?: string;
  animal_category?: AnimalCategory;
  animal_image?: string;
  farmer_name?: string;
  purchase_type: PurchaseType;
  shares: number;
  price_per_share: number;
  total_price: number;
  payment_status: PaymentStatus;
  delivery_status: DeliveryStatus;
  payment_method: string;
  transaction_id?: string;
  delivery_address: string;
  delivery_city: string;
  delivery_option?: 'live_animal' | 'meat_packaged' | 'charity_donated';
  special_instructions?: string;
  created_at: string;
}

export interface Share {
  id: number;
  animal_id: number;
  customer_id: number;
  customer_name?: string;
  share_number: number;
  purchased_at?: string;
}

export interface Payment {
  id: number;
  order_id: number;
  transaction_id: string;
  payment_method: string;
  amount: number;
  status: string;
  paid_at: string;
}

export interface CartItem {
  animal: Animal;
  purchase_type: PurchaseType;
  shares: number;
  total_price: number;
}

export interface SystemStats {
  totalUsers: number;
  totalCustomers: number;
  totalFarmers: number;
  totalAnimals: number;
  totalSoldAnimals: number;
  totalOrders: number;
  totalRevenue: number;
  totalSharesSold: number;
}
