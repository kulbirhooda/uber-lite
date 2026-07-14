import { useAuth } from "../context/authContext";

export default function DriverDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <h2>Welcome, {user?.name}</h2>
      <div className="vehicle-info">
        <p><strong>Vehicle model:</strong> {user?.driver?.vehicleModel}</p>
        <p><strong>Plate number:</strong> {user?.driver?.plateNumber}</p>
        <p><strong>Vehicle type:</strong> {user?.driver?.vehicleType}</p>
      </div>
    </div>
  );
}