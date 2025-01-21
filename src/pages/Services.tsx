import { Box } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchServices } from "@/services/services";
import { Service } from "@/types";

const Services = () => {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  // Calculate statistics
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
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatsCard
              title="Total Services"
              value={totalServices.toString()}
              icon={Box}
              description="All services"
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

          {/* Services Table */}
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : services?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No services found.</TableCell>
                  </TableRow>
                ) : (
                  services?.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.title}</TableCell>
                      <TableCell>{service.category.name}</TableCell>
                      <TableCell>${service.price}</TableCell>
                      <TableCell>{service.rating.toFixed(1)}</TableCell>
                      <TableCell>{service.reviewCount}</TableCell>
                      <TableCell>
                        <Badge variant={service.isActive ? 'secondary' : 'outline'}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
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

export default Services;