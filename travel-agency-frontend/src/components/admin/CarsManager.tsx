import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Trash2, Plus, Edit } from "lucide-react";
import { toast } from "sonner";

interface CarData {
  id: number;
  name: string;
  category: string;
  price: number;
  seats: number;
  transmission: string;
  image: string;
  features: string[];
  isActive: boolean;
}

export function CarsManager() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "economy",
    price: 50,
    seats: 5,
    transmission: "automatic",
    image: "",
    featuresString: "Air Conditioning, Bluetooth, GPS",
    isActive: true,
  });

  const fetchCars = async () => {
    try {
      const data = await api.get("/cars?admin=true");
      setCars(data);
    } catch (error) {
      toast.error("Failed to load cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        features: formData.featuresString,
      };

      if (editingId) {
        await api.put(`/cars/${editingId}`, payload);
        toast.success("Car updated");
      } else {
        await api.post("/cars", payload);
        toast.success("Car created");
      }
      setIsOpen(false);
      setEditingId(null);
      setFormData({
        name: "",
        category: "economy",
        price: 50,
        seats: 5,
        transmission: "automatic",
        image: "",
        featuresString: "Air Conditioning, Bluetooth",
        isActive: true,
      });
      fetchCars();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/cars/${id}`);
      toast.success("Car deleted");
      fetchCars();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (car: CarData) => {
    setEditingId(car.id);
    setFormData({
      name: car.name,
      category: car.category,
      price: car.price,
      seats: car.seats,
      transmission: car.transmission,
      image: car.image,
      featuresString: car.features.join(", "),
      isActive: car.isActive,
    });
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1B4965]">
            Fleet Management
          </h2>
          <p className="text-gray-500">Manage cars for renting</p>
        </div>

        <Dialog
          open={isOpen}
          onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) => {
            setIsOpen(open);
            if (!open) setEditingId(null);
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#1B4965] text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Car
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Car" : "Add New Car"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label>Car Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Toyota RAV4"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v: any) =>
                    setFormData({ ...formData, category: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Transmission</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(v: any) =>
                    setFormData({ ...formData, transmission: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Price per Day (€)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Seats</Label>
                <Select
                  value={String(formData.seats)}
                  onValueChange={(v: any) =>
                    setFormData({ ...formData, seats: Number(v) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Seats</SelectItem>
                    <SelectItem value="4">4 Seats</SelectItem>
                    <SelectItem value="5">5 Seats</SelectItem>
                    <SelectItem value="7">7 Seats</SelectItem>
                    <SelectItem value="9">9 Seats</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Image URL</Label>
                <Input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Features (comma separated)</Label>
                <Input
                  value={formData.featuresString}
                  onChange={(e) =>
                    setFormData({ ...formData, featuresString: e.target.value })
                  }
                  placeholder="GPS, Bluetooth, AC..."
                />
              </div>
              <div className="flex items-center space-x-2 col-span-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(c: any) =>
                    setFormData({ ...formData, isActive: c })
                  }
                />
                <Label>Active (Available for rent)</Label>
              </div>
              <Button
                onClick={handleSubmit}
                className="col-span-2 bg-[#E8A628] text-white"
              >
                Save Car
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Car</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Specs</TableHead>
              <TableHead className="font-bold">Price/Day</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">{car.name}</TableCell>
                <TableCell className="capitalize">{car.category}</TableCell>
                <TableCell>
                  {car.transmission}, {car.seats} seats
                </TableCell>
                <TableCell>€{car.price}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      car.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {car.isActive ? "Active" : "Hidden"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(car)}
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(car.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
