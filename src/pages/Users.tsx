import { useState } from "react";
import { Users as UsersIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchUsers, updateUserVerification } from "@/services/users";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const Users = () => {
  const { toast } = useToast();
  const { data: users, isLoading, refetch } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const handleVerificationUpdate = async (userId: string, isVerified: boolean) => {
    try {
      await updateUserVerification(userId, isVerified);
      toast({
        title: "Verification Updated",
        description: `User verification has been updated to ${isVerified ? 'Verified' : 'Unverified'}`,
      });
      refetch(); // Refetch users to update the UI
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user verification",
        variant: "destructive",
      });
    }
  };

  // Calculate statistics
  const totalClients = users?.filter((user) => user.userType === 'UserType.client').length || 0;
  const totalProviders = users?.filter((user) => user.userType === 'UserType.serviceProvider').length || 0;
  const pendingApprovals = users?.filter((user) => user.userType === 'UserType.serviceProvider' && !user.isVerified).length || 0;

  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatsCard
              title="Total Clients"
              value={totalClients.toString()}
              icon={UsersIcon}
              description="+180 from last month"
            />
            <StatsCard
              title="Active Providers"
              value={totalProviders.toString()}
              icon={UsersIcon}
              description="+20% increase"
            />
            <StatsCard
              title="Pending Approvals"
              value={pendingApprovals.toString()}
              icon={UsersIcon}
              description="Service providers awaiting approval"
            />
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : users?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.userType === 'UserType.admin'
                              ? 'default'
                              : user.userType === 'UserType.serviceProvider'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {user.userType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isVerified ? 'secondary' : 'outline'}>
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleVerificationUpdate(user.id, !user.isVerified)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {user.isVerified ? 'Unverify' : 'Verify'}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;