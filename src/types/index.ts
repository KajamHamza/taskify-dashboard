export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'provider';
  status: 'active' | 'blocked';
  isVerified: boolean;
  createdAt: string;
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
  isPaid: boolean;
  createdAt: string;
  completedAt?: string;
}