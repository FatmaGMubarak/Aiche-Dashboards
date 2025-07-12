import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../store/reducers/authSlice"; 

export default function RegisterAdminPage() {
  const admim = useSelector((state) => state.auth.admim);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!admim) {
      navigate("/");
    }
  }, [navigate, admim]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        title: formData.title,
      };

      await dispatch(registerAdmin(registerData)).unwrap();

      setSuccess("Admin registered successfully!");
      setFormData({ name: "", title: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="max-w-xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Register New Admin</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
}
