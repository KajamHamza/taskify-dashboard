import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Category } from '@/types';

export const fetchCategories = async (): Promise<Category[]> => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    image: doc.data().imageUrl,
  }));
};