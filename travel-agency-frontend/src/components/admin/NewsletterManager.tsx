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
import { Trash2, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

interface Subscriber {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  interests: string[];
}

export function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      setIsLoading(true);
      const data = await api.get("/newsletter");
      setSubscribers(data);
    } catch (e) {
      toast.error("Failed to fetch subscribers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;
    try {
      await api.delete(`/newsletter/${id}`);
      toast.success("Subscriber removed");
      fetchSubscribers();
    } catch (e) {
      toast.error("Error removing subscriber");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1B4965]">
            Newsletter Subscribers
          </h2>
          <p className="text-gray-500">Manage your mailing list</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Full Name</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">Interests</TableHead>
              <TableHead className="font-bold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin" /> Loading subscribers...
                  </div>
                </TableCell>
              </TableRow>
            ) : subscribers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-gray-500"
                >
                  No subscribers found.
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">
                    {sub.firstName} {sub.lastName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      {sub.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {sub.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                      onClick={() => handleDelete(sub.id)}
                    >
                      <Trash2 size={18} />
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
