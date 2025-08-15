import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../store/reducers/userSlice";
import avatar from "../assets/noProfile.png";
import notify from "../hooks/Notifications";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.user?.user);
  const loadingPage = useSelector((state) => state?.user?.loading);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()
  const [initialValues, setInitialValues] = useState({
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  bio: "",
  image: null,
});

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

useEffect(() => {
  if (profile) {
    const init = {
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      linkedin: profile.linkedIn_link || "",
      bio: profile.bio || "",
      image: profile.image_url || null,
    };
    formik.setValues(init);
    setInitialValues(init);
    setSelectedImage(profile.image_url);
  }
}, [profile]);

const handleCancel = () => {
  formik.setValues(initialValues);
  setSelectedImage(initialValues.image);
};

  const validationSchema = Yup.object({
    phone: Yup.string().nullable(),
    linkedin: Yup.string().url("Must be a valid URL").nullable(),
    bio: Yup.string().max(500).nullable(),
image: Yup.mixed()
  .nullable()
  .test("fileSize", "Max img size is 6MB", (value) => {
    if (!value || typeof value === "string") return true;
    return value.size <= 6000000;
  })
  .test("fileType", "Unsupported file type", (value) => {
    if (!value || typeof value === "string") return true;
    return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
  }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("phone", values.phone);
      formData.append("linkedin", values.linkedin);
      formData.append("bio", values.bio);
  if (values.image instanceof File) {
  formData.append("image", values.image);
}

      const result = await dispatch(updateProfile(formData)).unwrap();
      if (result){
        notify("Profile updated successfully", "success");
        dispatch(getProfile());
        nav("/profile")
      }
    } catch (err) {
      const error = err?.message || "Something went wrong!";
      notify(error, "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      bio: "",
      image: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageUpload = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setSelectedImage(imgUrl);
      formik.setFieldValue("image", file);
    } else {
      formik.setFieldValue("image", null);
    }
  };

      if (loadingPage) {
      return (
        <div className="flex justify-center items-center min-h-screen pt-28">
          <ThreeDot color="#05284B" size="medium" text="" textColor="" />
        </div>
      );
    }


  return (
    <div className="max-w-5xl mx-auto mt-20 pt-24 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Profile</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center">
<div className="flex flex-col items-center gap-4">
  <div className="relative w-32 h-32 rounded-full border-4 border-customBlue3 overflow-hidden">
    <img
      src={selectedImage || avatar}
      alt="Profile"
      className="object-cover w-full h-full"
    />
  </div>

  <div className="flex  items-center gap-2">
    <label className="text-sm font-medium text-white cursor-pointer hover:bg-customBlue2 bg-customBlue3 px-2.5 py-1.5 rounded-lg">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      Upload
    </label>

    <button
      type="button"
      onClick={() => {
         setSelectedImage(profile?.image_url);
    formik.setFieldValue("image", profile?.image_url || null);
      }}
      className="text-sm text-white hover:bg-gray-700 bg-gray-500 px-2.5 py-1.5 rounded-lg"
    >
      Reset 
    </button>

    {formik.touched.image && formik.errors.image && (
      <p className="text-red-500 text-sm text-center">{formik.errors.image}</p>
    )}
  </div>
</div>

          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm mt-2 text-center">{formik.errors.image}</p>
          )}
        </div>

       
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-md"
              disabled
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-md"
              disabled
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Not Provided"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="LinkedIn URL"
            />
            {formik.touched.linkedin && formik.errors.linkedin && (
              <p className="text-red-500 text-sm">{formik.errors.linkedin}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              rows="4"
              className="w-full p-2 border rounded-md resize-none"
              placeholder="Tell us about yourself..."
            />
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-red-500 text-sm">{formik.errors.bio}</p>
            )}
          </div>

<div className="md:col-span-2 flex justify-center gap-4">
  <button
    type="submit"
    disabled={loading}
    className="px-6 py-2 bg-customBlue3 text-white rounded-xl hover:bg-customBlue2 transition disabled:opacity-50"
  >
    {loading ? "Saving..." : "Save Changes"}
  </button>

  <button
    type="button"
    onClick={handleCancel}
    disabled={loading}
    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition disabled:opacity-50"
  >
    Cancel
  </button>
</div>

        </div>
      </form>
    </div>
  );
}
