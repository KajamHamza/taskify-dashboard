import { createDocument, getDocuments, updateDocument, deleteDocument } from '@/lib/firebase';
import { User } from '@/types';

const COLLECTION_NAME = 'users';

export const createUser = async (userData: Partial<User>) => {
  return await createDocument(COLLECTION_NAME, userData);
};

export const getAllUsers = async () => {
  return await getDocuments(COLLECTION_NAME);
};

// Add the missing fetchUsers function
export const fetchUsers = async (): Promise<User[]> => {
  return await getDocuments(COLLECTION_NAME);
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