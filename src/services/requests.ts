import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { mockRequests } from '@/mock/data';
import { ServiceRequest } from '@/types';

export const fetchRequests = async (): Promise<ServiceRequest[]> => {
  try {
    const requestsSnapshot = await getDocs(collection(db, 'serviceRequests'));
    return requestsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        serviceId: data.serviceId || '', // Provide default values
        clientId: data.clientId || '',
        providerId: data.providerId || '',
        proposedPrice: data.proposedPrice || 0,
        status: data.status || '',
        isPaid: data.isPaid || false,
        createdAt: data.createdAt || new Date().toISOString(),
        completedAt: data.completedAt || null, // Optional field
        paymentIntentId: data.paymentIntentId || null, // Optional field
      } as ServiceRequest;
    });
  } catch (error) {
    console.log('Using mock data due to Firebase error:', error);
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