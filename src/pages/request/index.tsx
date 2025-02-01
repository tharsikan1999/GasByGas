import { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/Dialog";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

interface OrderDetails {
  id: number;
  gasType: string;
  quantity: number;
  status: string;
  date: string;
}

export default function GasRequest() {
  const { user } = UseAuth();
  const [gasType, setGasType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const router = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowLoginDialog(true);
      return;
    }
    // TODO: Implement actual gas request submission to backend
    console.log("Gas request submitted:", { gasType, quantity });

    // Simulate a successful submission
    const orderId = Math.floor(Math.random() * 1000000); // Generate a random order ID
    const newOrderDetails = {
      id: orderId,
      gasType,
      quantity,
      status: "Pending",
      date: new Date().toISOString(),
    };

    // Store order details in localStorage (this is a temporary solution)
    localStorage.setItem("lastOrder", JSON.stringify(newOrderDetails));

    setOrderDetails(newOrderDetails);
    setShowSuccessDialog(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Request Gas</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="gasType" className="block mb-2">
            Gas Type
          </label>
          <select
            id="gasType"
            value={gasType}
            onChange={(e) => setGasType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a gas type</option>
            <option value="12kg">12kg</option>
            <option value="5kg">5kg</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit Request
        </button>
      </form>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>Please log in to request gas.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router("/login")}>Go to Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Order Submitted Successfully</DialogTitle>
            <DialogDescription>
              Your gas request has been submitted. Here are your order details:
            </DialogDescription>
          </DialogHeader>
          {orderDetails && (
            <div className="mt-4">
              <p>
                <strong>Order ID:</strong> {orderDetails.id}
              </p>
              <p>
                <strong>Gas Type:</strong> {orderDetails.gasType}
              </p>
              <p>
                <strong>Quantity:</strong> {orderDetails.quantity}
              </p>
              <p>
                <strong>Status:</strong> {orderDetails.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(orderDetails.date).toLocaleString()}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                router("/dashboard");
              }}
            >
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
