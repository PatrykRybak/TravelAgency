import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
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
import { Trash2, Plus, Star, Edit } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: number;
  username: string;
  city: string;
  country: string;
  rating: number;
  comment: string;
  isActive: boolean;
}

export function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    city: "",
    country: "",
    rating: 5,
    comment: "",
    isActive: true,
  });

  const fetchReviews = async () => {
    try {
      const data = await api.get("/reviews?admin=true");
      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await api.put(`/reviews/${editingId}`, formData);
        toast.success("Review updated");
      } else {
        await api.post("/reviews", formData);
        toast.success("Review created");
      }
      setIsOpen(false);
      setEditingId(null);
      setFormData({
        username: "",
        city: "",
        country: "",
        rating: 5,
        comment: "",
        isActive: true,
      });
      fetchReviews();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      toast.success("Review deleted");
      fetchReviews();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setFormData({
      username: review.username,
      city: review.city,
      country: review.country,
      rating: review.rating,
      comment: review.comment,
      isActive: review.isActive,
    });
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1B4965]">Client Reviews</h2>
          <p className="text-gray-500">Manage clients opinions</p>
        </div>

        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setEditingId(null);
              setFormData({
                username: "",
                city: "",
                country: "",
                rating: 5,
                comment: "",
                isActive: true,
              });
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#1B4965] hover:bg-[#153749] text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Review" : "Add New Review"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="e.g. wanderlust_anna"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rating (0-5)</Label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Comment</Label>
                <Textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label>Active (Visible on website)</Label>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-[#E8A628] hover:bg-[#D4A024] text-white"
              >
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">User</TableHead>
              <TableHead className="font-bold">Location</TableHead>
              <TableHead className="font-bold">Rating</TableHead>
              <TableHead className="font-bold">Comment</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.username}</TableCell>
                <TableCell>
                  {review.city}, {review.country}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-[#E8A628] fill-current mr-1" />
                    {review.rating}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate" title={review.comment}>
                  {review.comment}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      review.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {review.isActive ? "Active" : "Draft"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(review)}
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-200 hover:bg-red-50"
                      size="icon"
                      onClick={() => handleDelete(review.id)}
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
