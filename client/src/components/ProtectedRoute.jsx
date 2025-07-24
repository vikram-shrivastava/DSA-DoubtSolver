import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
    console.log("user: ",user)
  if (loading) return <div>Loading...</div>; // or a spinner

  return user ? children : <Navigate to="/login" />;

};

export default ProtectedRoute;
