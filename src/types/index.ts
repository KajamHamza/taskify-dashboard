export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'provider';
  status: 'active' | 'blocked';
  createdAt: string;
  isVerified: boolean;
}

export interface Service {
  id: string;
  title: string;
  providerId: string;
  category: string;
  price: number;
  location: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface Request {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  proposedPrice: number;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  isPaid: boolean;
}