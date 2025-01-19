import { collection, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { mockUsers } from '@/mock/data';
import { User } from '@/types';

export const fetchUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  } catch (error) {
    console.log('Using mock data due to Firebase error:', error);
    return mockUsers;
  }
};

export const updateUserStatus = async (userId: string, status: 'active' | 'blocked') => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { status });
    return true;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
