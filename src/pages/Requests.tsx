import { FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchRequests, updateRequestStatus } from "@/services/requests";
import { Request } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const Requests = () => {
  const { toast } = useToast();
  const { data: requests, isLoading, refetch } = useQuery({
    queryKey: ['requests'],
    queryFn: fetchRequests
  });

  const handleStatusUpdate = async (requestId: string, status: 'pending' | 'in-progress' | 'completed' | 'cancelled') => {
    try {
      await updateRequestStatus(requestId, status);
      toast({
        title: "Status Updated",
        description: `Request status has been updated to ${status}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
    }
  };

  const totalRequests = requests?.length || 0;
  const pendingRequests = requests?.filter(req => req.status === 'pending').length || 0;
  const inProgressRequests = requests?.filter(req => req.status === 'in-progress').length || 0;
  const completedRequests = requests?.filter(req => req.status === 'completed').length || 0;

  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatsCard
              title="Total Requests"
              value={totalRequests.toString()}
              icon={FileText}
              description="All time"
            />
            <StatsCard
              title="Pending"
              value={pendingRequests.toString()}
              icon={FileText}
              description="Awaiting action"
            />
            <StatsCard
              title="In Progress"
              value={inProgressRequests.toString()}
              icon={FileText}
              description="Currently active"
            />
            <StatsCard
              title="Completed"
              value={completedRequests.toString()}
              icon={FileText}
              description="Successfully finished"
            />
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Service ID</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : requests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.serviceId}</TableCell>
                    <TableCell>{request.clientId}</TableCell>
                    <TableCell>${request.proposedPrice}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          request.status === 'completed'
                            ? 'secondary'
                            : request.status === 'in-progress'
                            ? 'secondary'
                            : request.status === 'cancelled'
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={request.isPaid ? 'secondary' : 'outline'}>
                        {request.isPaid ? 'Paid' : 'Unpaid'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <select
                        onChange={(e) => handleStatusUpdate(request.id, e.target.value as any)}
                        value={request.status}
                        className="text-sm border rounded p-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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

export default Requests;