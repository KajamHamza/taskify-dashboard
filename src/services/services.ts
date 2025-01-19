import { collection, getDocs, query, where, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { mockServices } from '@/mock/data';
import { Service } from '@/types';

export const fetchServices = async () => {
  try {
    const servicesSnapshot = await getDocs(collection(db, 'services'));
    return servicesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Service[];
  } catch (error) {
    console.log('Using mock data due to Firebase error:', error);
    return mockServices;
  }
};

export const updateServiceStatus = async (serviceId: string, isActive: boolean) => {
  try {
    const serviceRef = doc(db, 'services', serviceId);
    await updateDoc(serviceRef, { isActive });
    return true;
  } catch (error) {
    console.error('Error updating service status:', error);
    throw error;
  }
};

export const deleteService = async (serviceId: string) => {
  try {
    await deleteDoc(doc(db, 'services', serviceId));
    return true;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};
