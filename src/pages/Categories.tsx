import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { uploadImage } from "@/services/Storage";
import StatsCard from "@/components/dashboard/StatsCard";
import { BoxesIcon } from "lucide-react";

// Fetch categories from Firestore
const fetchCategories = async (): Promise<Category[]> => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    image: doc.data().imageUrl,
  }));
};

// Update category in Firestore
const updateCategory = async (categoryId: string, updatedData: { name?: string; imageUrl?: string }) => {
  const categoryRef = doc(db, "categories", categoryId);
  await updateDoc(categoryRef, updatedData);
};

const Categories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editedCategoryImage, setEditedCategoryImage] = useState<File | null>(null);

  // Fetch categories
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Add new category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory: { name: string; imageUrl: string }) => {
      const docRef = await addDoc(collection(db, "categories"), newCategory);
      return { id: docRef.id, ...newCategory };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Category added successfully!" });
      setNewCategoryName("");
      setNewCategoryImage(null);
    },
    onError: () => {
      toast({ title: "Error adding category", variant: "destructive" });
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: async (updatedCategory: { id: string; name?: string; imageUrl?: string }) => {
      await updateCategory(updatedCategory.id, {
        name: updatedCategory.name,
        imageUrl: updatedCategory.imageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Category updated successfully!" });
      setEditingCategoryId(null);
    },
    onError: () => {
      toast({ title: "Error updating category", variant: "destructive" });
    },
  });

  // Handle adding a new category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryName || !newCategoryImage) {
      toast({ title: "Please fill out all fields", variant: "destructive" });
      return;
    }

    try {
      const imageUrl = await uploadImage(newCategoryImage, "categories_images");
      await addCategoryMutation.mutateAsync({ name: newCategoryName, imageUrl });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle editing a category
  const handleEditCategory = async (categoryId: string) => {
    const category = categories?.find((cat) => cat.id === categoryId);
    if (!category) return;

    setEditingCategoryId(categoryId);
    setEditedCategoryName(category.name);
  };

  // Handle saving edits
  const handleSaveEdit = async (categoryId: string) => {
    try {
      let imageUrl: string | undefined;
      if (editedCategoryImage) {
        imageUrl = await uploadImage(editedCategoryImage, "categories_images");
      }

      await updateCategoryMutation.mutateAsync({
        id: categoryId,
        name: editedCategoryName,
        imageUrl,
      });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Calculate total categories
  const totalCategories = categories?.length || 0;

  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatsCard
              title="Total Categories"
              value={totalCategories.toString()}
              icon={BoxesIcon}
              description="All categories available"
            />
          </div>

          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="mb-6">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setNewCategoryImage(e.target.files?.[0] || null)}
              />
              <Button type="submit" disabled={addCategoryMutation.isPending}>
                {addCategoryMutation.isPending ? "Adding..." : "Add Category"}
              </Button>
            </div>
          </form>

          {/* Categories Table */}
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : categories?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  categories?.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        {editingCategoryId === category.id ? (
                          <Input
                            type="text"
                            value={editedCategoryName}
                            onChange={(e) => setEditedCategoryName(e.target.value)}
                          />
                        ) : (
                          category.name
                        )}
                      </TableCell>
                      <TableCell>
                        {editingCategoryId === category.id ? (
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEditedCategoryImage(e.target.files?.[0] || null)}
                          />
                        ) : (
                          <img src={category.image} alt={category.name} className="w-10 h-10 rounded-full" />
                        )}
                      </TableCell>
                      <TableCell>
                        {editingCategoryId === category.id ? (
                          <Button onClick={() => handleSaveEdit(category.id)}>Save</Button>
                        ) : (
                          <Button onClick={() => handleEditCategory(category.id)}>Edit</Button>
                        )}
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

export default Categories;