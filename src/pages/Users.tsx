import { useState } from "react";
import { Users as UsersIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchUsers, updateUserStatus } from "@/services/users";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const Users = () => {
  const { toast } = useToast();
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const handleStatusUpdate = async (userId: string, newStatus: 'active' | 'blocked') => {
    try {
      await updateUserStatus(userId, newStatus);
      toast({
        title: "Status Updated",
        description: `User status has been updated to ${newStatus}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const totalClients = users?.filter(user => user.role === 'client').length || 0;
  const totalProviders = users?.filter(user => user.role === 'provider').length || 0;
  const pendingApprovals = users?.filter(user => user.role === 'provider' && !user.isVerified).length || 0;
  const blockedUsers = users?.filter(user => user.status === 'blocked').length || 0;

  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
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
            <StatsCard
              title="Blocked Users"
              value={blockedUsers.toString()}
              icon={UsersIcon}
              description="Total blocked accounts"
            />
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : user.role === 'provider' ? 'secondary' : 'outline'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'secondary' : 'destructive'}>
                        {user.status}
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
                        onClick={() => handleStatusUpdate(user.id, user.status === 'active' ? 'blocked' : 'active')}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {user.status === 'active' ? 'Block' : 'Unblock'}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;