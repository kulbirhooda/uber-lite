import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import './Signup.css'

export default function SignupDriver() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("AFFORDABLE");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { signupDriver, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate("/driver/dashboard");
  }, [isLoggedIn, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await signupDriver({ name, email, password: pwd, vehicleModel, plateNumber, vehicleType });
      navigate("/driver/dashboard");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Uber</div>
        <h2 className="auth-title">Become a driver</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="auth-input"
            placeholder="Email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          <input
            className="auth-input"
            placeholder="Vehicle model (e.g. Honda City)"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
          />
          <input
            className="auth-input"
            placeholder="Plate number"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            required
          />
          <select
            className="auth-input"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="AFFORDABLE">Affordable</option>
            <option value="PREMIUM">Premium</option>
            <option value="LUXURY">Luxury</option>
            <option value="BIG">Big</option>
          </select>
          <button className="auth-button" type="submit">Sign up as driver</button>
        </form>
        {err && <p className="auth-error">{err}</p>}
        <p className="auth-footer">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}