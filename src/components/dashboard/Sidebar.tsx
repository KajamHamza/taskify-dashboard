import Categories from "@/pages/Categories";
import { Home, Users, Box, FileText, TypeIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Overview", path: "/" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: Box, label: "Services", path: "/services" },
    { icon: FileText, label: "Requests", path: "/requests" },
    { icon: TypeIcon, label: "Categories", path: "/categories" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Taskify Panel</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary bg-blue-50"
                  : "text-gray-600 hover:text-primary hover:bg-blue-50"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;