export const mockUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@example.com",
    role: "admin" as const,
    status: "active" as const,
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    phoneNumber: "+1234567890",
    photoUrl: "https://example.com/john.jpg"
  },
  {
    id: "2",
    name: "Sarah Provider",
    email: "provider@example.com",
    role: "provider" as const,
    status: "active" as const,
    isVerified: true,
    createdAt: "2024-01-15T00:00:00Z",
    phoneNumber: "+0987654321",
    photoUrl: "https://example.com/sarah.jpg"
  },
  {
    id: "3",
    name: "Mike Client",
    email: "client@example.com",
    role: "client" as const,
    status: "active" as const,
    isVerified: false,
    createdAt: "2024-02-01T00:00:00Z",
    phoneNumber: "+1122334455",
    photoUrl: "https://example.com/mike.jpg"
  }
];

export const mockServices = [
  {
    id: "1",
    title: "Web Development",
    providerId: "2",
    category: "Development",
    price: 1000,
    location: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    rating: 4.8,
    reviewCount: 25,
    isActive: true,
    createdAt: "2024-01-10T00:00:00Z",
    description: "Professional web development services.",
    images: ["https://example.com/web1.jpg", "https://example.com/web2.jpg"]
  },
  {
    id: "2",
    title: "Logo Design",
    providerId: "2",
    category: "Design",
    price: 500,
    location: {
      latitude: 34.0522,
      longitude: -118.2437
    },
    rating: 4.5,
    reviewCount: 15,
    isActive: true,
    createdAt: "2024-01-20T00:00:00Z",
    description: "Creative logo design services.",
    images: ["https://example.com/logo1.jpg", "https://example.com/logo2.jpg"]
  }
];

export const mockRequests = [
  {
    id: "1",
    serviceId: "1",
    clientId: "3",
    providerId: "2",
    proposedPrice: 950,
    status: "in-progress" as const,
    isPaid: true,
    createdAt: "2024-02-05T00:00:00Z",
    completedAt: "2024-02-15T00:00:00Z",
    paymentIntentId: "pi_123456789"
  },
  {
    id: "2",
    serviceId: "2",
    clientId: "3",
    providerId: "2",
    proposedPrice: 480,
    status: "pending" as const,
    isPaid: false,
    createdAt: "2024-02-10T00:00:00Z",
    completedAt: null,
    paymentIntentId: null
  }
];