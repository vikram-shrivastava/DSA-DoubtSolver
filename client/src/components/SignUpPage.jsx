import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    leetcodeUsername: "",
    PreferredLanguage: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData); // Debug

      const response = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Response from server:", response); // Debug
      if (!response.status || response.status !== 201) {
        const errorData = await response.error;
        console.error("Signup failed:", errorData || "Unknown error");
        return;
      }
      const data = await response.data;
      setUser(data?.user); // or `data` depending on your backend response structure
      console.log("Signup successful:", response.data);
      navigate("/login");

      // window.location.href = "/login"; // redirect to login after successful signup
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 mt-16">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Sign Up
        </h2>
        <form className="space-y-4 mt-6" onSubmit={handleSignup}>
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Name:          
          </label>
          <input
            label="Username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Email:
          </label>
          <input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            autoFocus
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Password:
          </label>
          <input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            autoFocus
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            LeetCode Username:
          </label>
          <input
            label="LeetCode Username"
            name="leetcodeUsername"
            placeholder="Enter your LeetCode username"
            value={formData.leetcodeUsername}
            onChange={handleChange}
            required
            autoFocus
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Preferred Language:
          </label>
          <input
            label="LeetCode Username"
            name="PreferredLanguage"
            placeholder="Enter your Preferred Language"
            value={formData.PreferredLanguage}
            onChange={handleChange}
            required
            autoFocus
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
