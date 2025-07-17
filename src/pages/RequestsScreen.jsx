import { Clock, CheckCircle, XCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

const RequestsScreen = () => {
  const { toast } = useToast();

  const requests = [
    {
      id: "1",
      name: "Fresh Vegetables",
      donor: "City Market",
      status: "pending",
      requestedAt: "2 hours ago",
      pickupTime: "Today, 6 PM",
    },
    {
      id: "2",
      name: "Bread & Pastries",
      donor: "Corner Bakery",
      status: "approved",
      requestedAt: "1 day ago",
      pickupTime: "Tomorrow, 8 AM",
    },
    {
      id: "3",
      name: "Cooked Meals",
      donor: "College Canteen",
      status: "completed",
      requestedAt: "3 days ago",
      pickupTime: "Completed",
    },
  ];

  const handleConfirmPickup = (requestId, foodName) => {
    toast({
      title: "Pickup Confirmed!",
      description: `You've confirmed pickup for ${foodName}`,
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "completed":
        return <Package className="w-5 h-5 text-blue-500" />;
      default:
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
        <p className="text-gray-600 mt-2">Track your food pickup requests</p>
      </div>

      {/* Requests List */}
      <div className="px-6 pt-6 space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(request.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">{request.name}</h3>
                  <p className="text-sm text-gray-600">{request.donor}</p>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>

            <div className="text-sm text-gray-500 mb-3">
              <p>Requested {request.requestedAt}</p>
              <p>Pickup: {request.pickupTime}</p>
            </div>

            {request.status === "approved" && (
              <Button
                size="sm"
                onClick={() => handleConfirmPickup(request.id, request.name)}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Confirm Pickup
              </Button>
            )}
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RequestsScreen;

