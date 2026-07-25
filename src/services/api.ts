import { User, Animal, Order, SystemStats, DeliveryStatus, AnimalCategory } from '../types';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('agro_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API Request Failed');
  }
  return data;
}

export const api = {
  // Auth
  register: (payload: any) => request<{ message: string; token: string; user: User }>('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: any) => request<{ message: string; token: string; user: User }>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => request<{ user: User }>('/auth/profile'),
  updateProfile: (payload: any) => request<{ user: User }>('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) }),

  // Animals
  getAnimals: (params?: { category?: string; search?: string; minPrice?: number; maxPrice?: number; farmerId?: number }) => {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.minPrice) query.append('minPrice', String(params.minPrice));
    if (params?.maxPrice) query.append('maxPrice', String(params.maxPrice));
    if (params?.farmerId) query.append('farmerId', String(params.farmerId));

    return request<{ animals: Animal[] }>(`/animals?${query.toString()}`);
  },

  getAnimalById: (id: number) => request<{ animal: Animal; shares: any[] }>(`/animals/${id}`),
  createAnimal: (payload: any) => request<{ message: string; animal: Animal }>('/animals', { method: 'POST', body: JSON.stringify(payload) }),
  updateAnimal: (id: number, payload: any) => request<{ message: string; animal: Animal }>(`/animals/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAnimal: (id: number) => request<{ message: string }>(`/animals/${id}`, { method: 'DELETE' }),

  // Orders
  createOrder: (payload: {
    animal_id: number;
    purchase_type: 'whole' | 'share';
    shares: number;
    payment_method: string;
    delivery_address: string;
    delivery_city: string;
    delivery_option?: string;
    special_instructions?: string;
  }) => request<{ message: string; order: Order; payment: any }>('/orders', { method: 'POST', body: JSON.stringify(payload) }),

  getOrders: () => request<{ orders: Order[] }>('/orders'),
  getOrderById: (id: number) => request<{ order: Order }>(`/orders/${id}`),
  updateOrderStatus: (id: number, status: DeliveryStatus) =>
    request<{ message: string; order: Order }>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Farmer
  getFarmerStats: () => request<{ totalAnimals: number; soldAnimals: number; activeListings: number; totalOrders: number; totalEarned: number }>('/farmer/stats'),
  getFarmerAnimals: () => request<{ animals: Animal[] }>('/farmer/animals'),
  getFarmerOrders: () => request<{ orders: Order[] }>('/farmer/orders'),

  // Admin
  getAdminUsers: () => request<{ users: User[] }>('/admin/users'),
  deleteAdminUser: (id: number) => request<{ message: string }>(`/admin/user/${id}`, { method: 'DELETE' }),
  getAdminOrders: () => request<{ orders: Order[] }>('/admin/orders'),
  getAdminReports: () => request<{ stats: SystemStats }>('/admin/reports'),
};
