import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/users'; // Ensure this import is correct
import { User } from '@/types'; // Import the User interface

const UserList = () => {
  // Fetch users
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="space-y-4">
        {users?.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Verified:</strong> {user.isVerified ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            {user.phoneNumber && <p><strong>Phone:</strong> {user.phoneNumber}</p>}
            {user.photoUrl && (
              <img
                src={user.photoUrl}
                alt={`${user.name}'s profile`}
                className="w-16 h-16 rounded-full mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;