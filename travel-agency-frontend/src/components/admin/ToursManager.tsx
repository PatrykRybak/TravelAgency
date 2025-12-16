import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Trash2, Plus, Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Tour {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  isActive: boolean;
  featured: boolean;
  region: string;
  location: string;
  startDate?: string;
  endDate?: string;
}

const initialFormState = {
  title: "",
  price: "",
  image: "",
  description: "",
  duration: "7",
  groupSize: "10",
  region: "europe",
  location: "",
  isActive: true,
  featured: false,
  startDate: "",
  endDate: "",
};

export function ToursManager() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(initialFormState);

  const fetchTours = async () => {
    try {
      setIsLoading(true);
      const data = await api.get("/tours?admin=true");
      setTours(data);
    } catch (e) {
      toast.error("Failed to fetch tours");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    try {
      await api.delete(`/tours/${id}`);
      toast.success("Tour deleted successfully");
      fetchTours();
    } catch (e) {
      toast.error("Error deleting tour");
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsDialogOpen(true);
  };

  const openEditModal = (tour: Tour) => {
    setEditingId(tour.id);

    let durationNumber = "1";
    if (tour.duration) {
      const parsed = parseInt(tour.duration);
      durationNumber = isNaN(parsed) ? "" : parsed.toString();
    }

    setFormData({
      title: tour.title,
      price: tour.price.toString(),
      image: tour.image || "",
      description: tour.description || "",
      duration: durationNumber,
      groupSize: tour.groupSize || "",
      region: tour.region || "europe",
      location: tour.location || "",
      isActive: tour.isActive,
      featured: tour.featured,
      startDate: tour.startDate || "",
      endDate: tour.endDate || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        duration: `${formData.duration} days`,
        rating: 5,
        reviews: 0,
      };

      if (editingId) {
        await api.put(`/tours/${editingId}`, payload);
        toast.success("Tour updated successfully");
      } else {
        await api.post("/tours", payload);
        toast.success("Tour created successfully");
      }

      setIsDialogOpen(false);
      fetchTours();
    } catch (e) {
      toast.error(editingId ? "Error updating tour" : "Error creating tour");
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B4965]">
            Tours Management
          </h2>
          <p className="text-gray-500">
            Manage your travel packages and offers
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-[#E8A628] hover:bg-[#d49622] text-white gap-2"
        >
          <Plus size={18} /> Add New Tour
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Image</TableHead>
              <TableHead className="font-bold">Title</TableHead>
              <TableHead className="font-bold">Region</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Dates</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin" /> Loading tours...
                  </div>
                </TableCell>
              </TableRow>
            ) : tours.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-gray-500"
                >
                  No tours found. Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              tours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell>
                    {tour.image && (
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{tour.title}</TableCell>
                  <TableCell className="capitalize">{tour.region}</TableCell>
                  <TableCell>€{tour.price}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {tour.startDate ? `from ${tour.startDate}` : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs w-fit ${
                          tour.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tour.isActive ? "Active" : "Hidden"}
                      </span>
                      {tour.featured && (
                        <span className="px-2 py-0.5 rounded-full text-xs w-fit bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditModal(tour)}
                      >
                        <Pencil size={16} className="text-gray-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(tour.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Tour" : "Create New Tour"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Region</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value: any) => handleChange("region", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="northAmerica">North America</SelectItem>
                    <SelectItem value="southAmerica">South America</SelectItem>
                    <SelectItem value="middleEast">Middle East</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (EUR)</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Group Size</Label>
                <Input
                  value={formData.groupSize}
                  onChange={(e) => handleChange("groupSize", e.target.value)}
                  placeholder="e.g. Up to 12"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (Days)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                    placeholder="e.g. 7"
                    className="pr-12"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                    days
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="e.g. Paris, France"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-6 py-4 border-t mt-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleChange("isActive", checked)
                  }
                />
                <Label
                  htmlFor="isActive"
                  className="cursor-pointer font-medium"
                >
                  Active (Visible)
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    handleChange("featured", checked)
                  }
                />
                <Label
                  htmlFor="featured"
                  className="cursor-pointer font-medium"
                >
                  Featured (Homepage)
                </Label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#1B4965] hover:bg-[#153a52] text-white"
              >
                {isSaving
                  ? "Saving..."
                  : editingId
                  ? "Update Tour"
                  : "Create Tour"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
