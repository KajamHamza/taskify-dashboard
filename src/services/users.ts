import { getDocuments, updateDocument, deleteDocument, createDocument } from '@/lib/firebase';
import { User } from '@/types';

const COLLECTION_NAME = 'users'; // Replace with your actual Firestore collection name

export const createUser = async (userData: Partial<User>) => {
  return await createDocument(COLLECTION_NAME, userData);
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await getDocuments(COLLECTION_NAME);

  // Transform the data to match the User interface
  return users.map((user) => ({
    id: user.id,
    email: user.email || '', // Provide a default value if email is missing
    name: user.name || '', // Provide a default value if name is missing
    userType: user.userType || 'UserType.client', // Provide a default value if role is missing
    createdAt: user.createdAt || new Date().toISOString(), // Provide a default value if createdAt is missing
    isVerified: user.isVerified || false, // Provide a default value if isVerified is missing
    photoUrl: user.photoUrl, // Optional field
    phoneNumber: user.phoneNumber, // Optional field
  }));
};

// Fetch users function
export const fetchUsers = async (): Promise<User[]> => {
  const users = await getDocuments(COLLECTION_NAME);

  // Transform the data to match the User interface
  return users.map((user) => ({
    id: user.id,
    email: user.email || '', // Provide a default value if email is missing
    name: user.name || '', // Provide a default value if name is missing
    userType: user.userType || 'UserType.client', // Provide a default value if role is missing
    createdAt: user.createdAt || new Date().toISOString(), // Provide a default value if createdAt is missing
    isVerified: user.isVerified || false, // Provide a default value if isVerified is missing
    photoUrl: user.photoUrl, // Optional field
    phoneNumber: user.phoneNumber, // Optional field
  }));
};

export const updateUser = async (userId: string, userData: Partial<User>) => {
  return await updateDocument(COLLECTION_NAME, userId, userData);
};

export const deleteUser = async (userId: string) => {
  return await deleteDocument(COLLECTION_NAME, userId);
};

export const updateUserStatus = async (userId: string, status: 'active' | 'blocked') => {
  return await updateDocument(COLLECTION_NAME, userId, { status });
};

// Add the updateUserVerification function
export const updateUserVerification = async (userId: string, isVerified: boolean) => {
  return await updateDocument(COLLECTION_NAME, userId, { isVerified });
};