import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { mockRequests } from '@/mock/data';
import { Request } from '@/types';

export const fetchRequests = async () => {
  try {
    const requestsSnapshot = await getDocs(collection(db, 'requests'));
    return requestsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Request[];
  } catch (error) {
    console.log('Using mock data due to Firebase error:', error);
    return mockRequests;
  }
};

export const updateRequestStatus = async (requestId: string, status: 'pending' | 'in-progress' | 'completed' | 'cancelled') => {
  try {
    const requestRef = doc(db, 'requests', requestId);
    await updateDoc(requestRef, { 
      status,
      updatedAt: new Date().toISOString(),
      ...(status === 'completed' ? { completedAt: new Date().toISOString() } : {})
    });
    return true;
  } catch (error) {
    console.error('Error updating request status:', error);
    throw error;
  }
};