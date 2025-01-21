import { collection, getDocs, query, where, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { mockServices } from '@/mock/data';
import { Service } from '@/types';


export const fetchServices = async (): Promise<Service[]> => {
  try {
    const servicesSnapshot = await getDocs(collection(db, 'services'));

    // Transform Firestore data to match the Service interface
    return servicesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        providerId: data.providerId || '', // Provide a default value if missing
        title: data.title || '', // Provide a default value if missing
        description: data.description || '', // Provide a default value if missing
        category: data.category || '', // Provide a default value if missing
        price: data.price || 0, // Provide a default value if missing
        rating: data.rating || 0, // Provide a default value if missing
        reviewCount: data.reviewCount || 0, // Provide a default value if missing
        isActive: data.isActive || false, // Provide a default value if missing
        createdAt: data.createdAt || new Date().toISOString(), // Provide a default value if missing
        images: data.images || [], // Optional field with default value
        location: data.location || undefined, // Optional field
      } as Service;
    });
  } catch (error) {
    console.log('Using mock data due to Firebase error:', error);
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
