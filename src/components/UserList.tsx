import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/services/users';
import { toast } from '@/components/ui/use-toast';

const UserList = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User created successfully",
      });
    }
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: ({ userId, data }) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    }
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="space-y-4">
        {users?.map((user: any) => (
          <div key={user.id} className="p-4 border rounded-lg">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => updateUserMutation.mutate({
                  userId: user.id,
                  data: { /* updated data */ }
                })}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUserMutation.mutate(user.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;