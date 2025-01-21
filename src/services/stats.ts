import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const fetchDashboardStats = async () => {
  try {
    // Fetch users
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const totalUsers = usersSnapshot.size;

    // Fetch services
    const servicesSnapshot = await getDocs(collection(db, 'services'));
    const totalServices = servicesSnapshot.size;

    // Fetch requests
    const requestsSnapshot = await getDocs(collection(db, 'serviceRequests'));
    const totalRequests = requestsSnapshot.size;

    // Calculate total revenue
    const totalRevenue = requestsSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      return acc + (data.proposedPrice || 0);
    }, 0);

    // Group requests by date (e.g., per day, week, or month)
    const requestsOverTime = requestsSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      const createdAt = data.createdAt;

      // Ensure createdAt is a Firestore Timestamp
      if (!(createdAt instanceof Timestamp)) {
        console.warn('Invalid createdAt format in document:', doc.id);
        return acc; // Skip documents with invalid createdAt
      }

      // Convert Firestore Timestamp to JavaScript Date
      const date = createdAt.toDate().toISOString().split('T')[0]; // Group by day

      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {} as Record<string, number>);

    // Convert grouped data into an array of { date, count } objects
    const requestData = Object.entries(requestsOverTime).map(([date, count]) => ({
      date,
      count,
    }));

    return {
      totalUsers,
      totalServices,
      totalRequests,
      totalRevenue,
      requestData, // Add request data over time
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalUsers: 0,
      totalServices: 0,
      totalRequests: 0,
      totalRevenue: 0,
      requestData: [], // Return empty array in case of error
    };
  }
};