import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { mockUsers, mockServices, mockRequests } from '@/mock/data';
import { User, Service, Request } from '@/types';

export const fetchDashboardStats = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const servicesSnapshot = await getDocs(collection(db, 'services'));
    const requestsSnapshot = await getDocs(collection(db, 'requests'));

    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
    const services = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
    const requests = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Request[];

    return calculateStats(users, services, requests);
  } catch (error) {
    console.log('Using mock data due to Firebase error:', error);
    return calculateStats(mockUsers, mockServices, mockRequests);
  }
};

const calculateStats = (users: User[], services: Service[], requests: Request[]) => {
  const totalUsers = users.length;
  const totalServices = services.length;
  const totalRequests = requests.length;
  const totalRevenue = requests
    .filter(request => request.status === 'completed' && request.isPaid)
    .reduce((sum, request) => sum + (request.proposedPrice || 0), 0);

  return {
    totalUsers,
    totalServices,
    totalRequests,
    totalRevenue,
    recentUsers: users.slice(-5),
    recentServices: services.slice(-5),
    recentRequests: requests.slice(-5),
  };
};