// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  userType: 'UserType.client' | 'UserType.serviceProvider' | 'UserType.admin'; // Matches UserType enum in Dart
  createdAt: string; // ISO string for DateTime
  phoneNumber?: string;
  isVerified: boolean;
}

// ServiceRequest Interface
export interface ServiceRequest {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  proposedPrice: number;
  status: 'RequestStatus.pending' | 'RequestStatus.accepted' | 'RequestStatus.rejected' | 'RequestStatus.completed' | 'RequestStatus.cancelled' | 'RequestStatus.paid' | 'RequestStatus.inProgress'; // Matches RequestStatus enum in Dart
  createdAt: string; // ISO string for DateTime
  completedAt?: string; // ISO string for DateTime
  paymentIntentId?: string;
  isPaid: boolean;
}

// Service Interface
export interface Service {
  id: string;
  providerId: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: Category; // Nested Category interface
  location: {
    latitude: number;
    longitude: number;
  }; // GeoPoint represented as an object
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string; // ISO string for DateTime
}

// Review Interface
export interface Review {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  userPhotoUrl?: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO string for DateTime
  images?: string[];
}

// Category Interface
export interface Category {
  id: string;
  name: string;
  image: string;
}