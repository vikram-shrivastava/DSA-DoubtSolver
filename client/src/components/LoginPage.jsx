import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function LoginPage() {

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        formData,
        { withCredentials: true }
      );
      console.log("Response from server:", response); // Debug
      if (!response.status || response.status !== 200) {
        const errorData = await response.error;
        console.error("Login failed:", errorData || "Unknown error");
        return;
      }
      console.log("Login successful:", response.data);
      const { user } = response.data;
      console.log("User data:", user);
      setUser(user);

      // Redirect
      navigate("/")
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Sign In</h2>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Name:
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            value={formData.username}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Password:
          </label>
          <input 
          label="Password" 
          name="password" 
          type="password" 
          placeholder="Enter your password" 
          onChange={handleChange}
          value={formData.password}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Forgot your password? <a href="/forgot" className="text-indigo-600 hover:underline">Click here</a>
        </p>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have a account? <a href="/signup" className="text-indigo-600 hover:underline">Click here</a>
        </p>
      </div>
    </div>
  );
}