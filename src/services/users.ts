import { createDocument, getDocuments, updateDocument, deleteDocument } from '@/lib/firebase';

const COLLECTION_NAME = 'users';

export const createUser = async (userData: any) => {
  return await createDocument(COLLECTION_NAME, userData);
};

export const getAllUsers = async () => {
  return await getDocuments(COLLECTION_NAME);
};

export const updateUser = async (userId: string, userData: any) => {
  return await updateDocument(COLLECTION_NAME, userId, userData);
};

export const deleteUser = async (userId: string) => {
  return await deleteDocument(COLLECTION_NAME, userId);
};