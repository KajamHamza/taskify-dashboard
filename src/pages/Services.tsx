import { Box } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchServices, updateServiceStatus } from "@/services/services";
import { useToast } from "@/components/ui/use-toast";

const Services = () => {
  const { toast } = useToast();
  const { data: services, isLoading, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices
  });

  const handleStatusUpdate = async (serviceId: string, isActive: boolean) => {
    try {
      await updateServiceStatus(serviceId, isActive);
      toast({
        title: "Status Updated",
        description: `Service has been ${isActive ? 'activated' : 'deactivated'}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive",
      });
    }
  };

  const totalServices = services?.length || 0;
  const activeServices = services?.filter(service => service.isActive).length || 0;
  const averageRating = services?.reduce((acc, service) => acc + service.rating, 0) / (totalServices || 1);
  const newServices = services?.filter(service => {
    const createdDate = new Date(service.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate > thirtyDaysAgo;
  }).length || 0;

  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatsCard
              title="Total Services"
              value={totalServices.toString()}
              icon={Box}
              description="Active services"
            />
            <StatsCard
              title="Active Services"
              value={activeServices.toString()}
              icon={Box}
              description="Currently available"
            />
            <StatsCard
              title="Average Rating"
              value={averageRating.toFixed(1)}
              icon={Box}
              description="Across all services"
            />
            <StatsCard
              title="New Services"
              value={newServices.toString()}
              icon={Box}
              description="Added this month"
            />
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Reviews</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : services?.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.title}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>{service.rating.toFixed(1)}</TableCell>
                    <TableCell>{service.reviewCount}</TableCell>
                    <TableCell>
                      <Badge variant={service.isActive ? 'success' : 'secondary'}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleStatusUpdate(service.id, !service.isActive)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {service.isActive ? 'Deactivate' : 'Activate'}
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

export default Services;