import { FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchRequests } from "@/services/requests";
import { ServiceRequest } from "@/types";

const Requests = () => {
  const { data: requests, isLoading } = useQuery<ServiceRequest[]>({
    queryKey: ['requests'],
    queryFn: fetchRequests,
  });

  // Calculate counts for each status
  const totalRequests = requests?.length || 0;
  const pendingRequests = requests?.filter(req => req.status === 'RequestStatus.pending').length || 0;
  const inProgressRequests = requests?.filter(req => req.status === 'RequestStatus.inProgress').length || 0;
  const completedRequests = requests?.filter(req => req.status === 'RequestStatus.completed').length || 0;
  const cancelledRequests = requests?.filter(req => req.status === 'RequestStatus.rejected').length || 0;
  const AcceptedRequests = requests?.filter(req => req.status === 'RequestStatus.accepted').length || 0;

  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          {/* Stats Cards */}
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
              title="Accepted"
              value={AcceptedRequests.toString()}
              icon={FileText}
              description="Awaiting Completion"
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
            <StatsCard
              title="Cancelled"
              value={cancelledRequests.toString()}
              icon={FileText}
              description="Cancelled requests"
            />
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Service ID</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Provider ID</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Completed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : requests?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">No requests found.</TableCell>
                  </TableRow>
                ) : (
                  requests?.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{request.serviceId}</TableCell>
                      <TableCell>{request.clientId}</TableCell>
                      <TableCell>{request.providerId}</TableCell>
                      <TableCell>${request.proposedPrice}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === 'RequestStatus.completed'
                              ? 'secondary'
                              : request.status === 'RequestStatus.inProgress'
                              ? 'secondary'
                              : request.status === 'RequestStatus.cancelled'
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
                        {request.completedAt ? new Date(request.completedAt).toLocaleDateString() : 'N/A'}
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

export default Requests;