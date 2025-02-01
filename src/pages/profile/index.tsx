import { UseAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = UseAuth();

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="max-w-md mx-auto">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>NIC:</strong> {user.nic}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
      </div>
    </div>
  );
}
