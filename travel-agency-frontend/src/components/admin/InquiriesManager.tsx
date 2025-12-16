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
import {
  Trash2,
  Loader2,
  MessageSquare,
  Car,
  Map as MapIcon,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";

interface Inquiry {
  id: number;
  email: string;
  itemType: "tour" | "car";
  itemId: string;
  itemTitle: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const data = await api.get("/inquiries");
      setInquiries(data);
    } catch (e) {
      toast.error("Failed to load inquiries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    try {
      await api.delete(`/inquiries/${id}`);
      toast.success("Deleted successfully");
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus as any } : i))
    );

    try {
      await api.put(`/inquiries/${id}/status`, { status: newStatus });
      toast.success("Status updated");
    } catch (e) {
      toast.error("Update failed");
      fetchInquiries();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "contacted":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "closed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B4965]">Inquiries</h2>
          <p className="text-gray-500">Manage customer questions and leads</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Customer Email</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Interested In</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin" /> Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : inquiries.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <MessageSquare className="w-8 h-8 text-gray-300" />
                    No inquiries yet.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="align-middle">
                  <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                    {inquiry.createdAt}
                  </TableCell>

                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      {inquiry.email}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="capitalize flex w-fit items-center gap-1"
                    >
                      {inquiry.itemType === "car" ? (
                        <Car className="w-3 h-3" />
                      ) : (
                        <MapIcon className="w-3 h-3" />
                      )}
                      {inquiry.itemType}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-medium text-gray-700">
                    {inquiry.itemTitle}
                  </TableCell>

                  <TableCell>
                    <Select
                      defaultValue={inquiry.status}
                      onValueChange={(val: string) =>
                        handleStatusChange(inquiry.id, val)
                      }
                    >
                      <SelectTrigger
                        className={`w-[130px] h-8 border-none ${getStatusColor(
                          inquiry.status
                        )}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                      onClick={() => handleDelete(inquiry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
