export const mockUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Sarah Provider",
    email: "provider@example.com",
    role: "provider",
    status: "active",
    isVerified: true,
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "3",
    name: "Mike Client",
    email: "client@example.com",
    role: "client",
    status: "active",
    isVerified: false,
    createdAt: "2024-02-01T00:00:00Z"
  }
] as const;

export const mockServices = [
  {
    id: "1",
    title: "Web Development",
    providerId: "2",
    category: "Development",
    price: 1000,
    location: "Remote",
    rating: 4.8,
    reviewCount: 25,
    isActive: true,
    createdAt: "2024-01-10T00:00:00Z"
  },
  {
    id: "2",
    title: "Logo Design",
    providerId: "2",
    category: "Design",
    price: 500,
    location: "Remote",
    rating: 4.5,
    reviewCount: 15,
    isActive: true,
    createdAt: "2024-01-20T00:00:00Z"
  }
] as const;

export const mockRequests = [
  {
    id: "1",
    serviceId: "1",
    clientId: "3",
    providerId: "2",
    proposedPrice: 950,
    status: "in-progress",
    isPaid: true,
    createdAt: "2024-02-05T00:00:00Z"
  },
  {
    id: "2",
    serviceId: "2",
    clientId: "3",
    providerId: "2",
    proposedPrice: 480,
    status: "pending",
    isPaid: false,
    createdAt: "2024-02-10T00:00:00Z"
  }
] as const;