import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import notify from "../hooks/Notifications";
import {loginAdmin} from '../store/reducers/authSlice'
import loginImg from '../assets/login.png'

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  loading  = useSelector((state) => state.auth.loading);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values, { setSubmitting }) => {
  try {
const result = await dispatch(loginAdmin(  values )).unwrap(); 

    if (result) {
      // notify(`Welcome ${result?.user?.name}! Login Successful.`, "success");
      navigate('/dashboard');
    } else {
      notify("Login failed. Please check your credentials.", "error");
    }
  } catch (error) {
    notify(error.error || "Login failed.", "error");
  } finally {
    setSubmitting(false);
  }
};

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <div className="bg-white w-full lg:w-[50vw] h-[50vh] lg:h-[100vh] hidden lg:flex lg:justify-center lg:items-center">
        <img src={loginImg} alt="Login" className="w-[60vw] sm:w-[35vw]" />
      </div>
      <div className="bg-customBlue3 w-full lg:w-[50vw] h-[100vh] flex flex-col p-10 justify-center items-center">
        <p className="text-white text-3xl mt-0 lg:mt-16 mb-2">Welcome!</p>
        <p className="text-white text-lg">Let's get you logged in</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col mt-10 w-full lg:w-[30vw]">
          <div className="flex flex-col gap-y-5">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="text"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500 -mt-4">{formik.errors.email}</div>
            )}

            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </span>
              <div className="w-full relative">

              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Password"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-white"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEye className="text-customBlue3" /> : <FaEyeSlash className="text-customBlue3" />}
              </div>
                            </div>

            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-500 -mt-4">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex justify-center items-center w-full lg:w-[30vw] mt-10">
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center text-white bg-transparent hover:bg-customBlue2 border border-white w-[30vw] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      
      </div>
    </div>
  );
}
