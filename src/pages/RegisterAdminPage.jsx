import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../store/reducers/authSlice"; 
import notify from "../hooks/Notifications";
import { FaSpinner } from "react-icons/fa";

export default function RegisterAdminPage() {
  const superAdmin = useSelector((state) => state.auth?.superAdmin);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!superAdmin) {
      navigate("/");
    }
  }, [navigate, superAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      title: formData.title,
    };

    await dispatch(registerAdmin(registerData)).unwrap();

    notify("Admin registered successfully!", "success");
    setFormData({ name: "", title: "", email: "", password: "" });
  } catch (err) {
    notify("Registration failed.", "error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="max-w-xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-customBlue3">Register New Admin</h1>
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
            disabled={loading}
            className="w-full bg-customBlue3 text-white py-3 rounded-lg hover:bg-customBlue2 flex justify-center items-center"
          >
            {loading ? (
                            <FaSpinner className="animate-spin text-xl" />
                          ) : (
                            "Register Admin"
                          )}
          </button>
        </form>
      </div>
    </div>
  );
}
