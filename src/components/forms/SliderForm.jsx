import { useState } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBanner } from "../../store/reducers/bannerSlice";

export default function SliderForm() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [selectedimage, setSelectedimage] = useState(null);
      const [initialValues] = useState({
  title: "",
  link: "",
  type: "",
  image: null,
});

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "title must be at least 2 characters")
      .max(50, "title must be at most 50 characters")
      .required("*title is required"),
    link: Yup.string()
      .min(2, "link must be at least 2 characters")
      .max(200, "link must be at most 200 characters")
      .required("*link is required"),
    type: Yup.string()
      .required("*type is required"),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "Max image size is 2MB",
        (value) => !value || value.size <= 2000000
      )
      .test(
        "fileType",
        "Unsupported file type",
        (value) =>
          !value ||
          ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("link", values.link);
      formData.append("type", values.type);
      if (values.image) {
        formData.append("image", values.image);
      }
      const result = await dispatch(createBanner(formData)).unwrap()
      if(result){
        notify("Your post is added successfully", "success")
        nav("/slider-page")
      }
        }catch (error) {
  const err = error;

  if (Array.isArray(err)) {
    notify(err[0], "error");
  } else if (typeof err === "string") {
    notify(err, "error"); 
  } else if (err?.message) {
    notify(err.message, "error"); 
  } else {
    notify("Something went wrong", "error");
  }

} finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      link: "",
      type: "",
      image: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleimageUpload = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedimage(imageUrl);
      formik.setFieldValue("image", file);
    } else {
      formik.setFieldValue("image", null);
    }
  };

  const handleReset = () =>{
      setSelectedimage(initialValues.image);

  }
    const handleCancel = () => {
  formik.setValues(initialValues);
};

  return (
    <div className=" w-full flex justify-center items-center py-8  mt-0 lg:mt-10 pb-0 pt-24 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8"
      >
        
        <div className="flex flex-col items-center w-full md:w-1/3">
          <label htmlFor="image" className="cursor-pointer group">
            <div className="relative w-32 h-32 rounded-full border-4 border-customBlue3 overflow-hidden group-hover:opacity-90 transition-all">
              {selectedimage ? (
                <img
                  src={selectedimage}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-customBlue3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <span className="text-xs text-center mt-1">
                    Upload Photo
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              id="image"
              title="image"
              accept="image/*"
              className="hidden"
              onChange={handleimageUpload}
              onBlur={formik.handleBlur}

            />
          </label>
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {formik.errors.image}
            </p>
          )}
                      <div className="flex items-center gap-2 mt-4">
  <button
    type="button"
    onClick={() => document.getElementById("image").click()}
    className="px-4 py-1 bg-customBlue3 text-white rounded-md text-sm hover:bg-customBlue2 transition"
  >
    Upload
  </button>

  <button
    type="button"
    onClick={handleReset}
    className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400 transition"
  >
    Reset
  </button>
</div>
        </div>

        <div className="flex flex-col w-full md:w-2/3 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              title="title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="link"
                className="block text-sm font-medium text-gray-900 dark:text-white"
>
                Link
            </label>
            <input type="text"
            name="link"
            id="link"
            value={formik.values.link}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
                                          className="w-full border border-gray-300 mt-2 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"

            />
             {formik.errors.link && formik.touched.link && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.link}
              </p>
            )}
</div>
<div>
            <label htmlFor="type"
                className="block text-sm font-medium text-gray-900 dark:text-white"
>
                Type
            </label>
            <select
    id="type"
    name="type"
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.type}
    className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-customBlue3 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-customBlue3 dark:focus:border-blue-500"
  >
    <option value="">Choose type</option>
    <option value="facebook">Facebook</option>
    <option value="instagram">Instagram</option>
    <option value="twitter">X</option>
  </select>
             {formik.errors.type && formik.touched.type && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.type}
              </p>
            )}
</div>

           <div className="md:col-span-2 flex justify-center gap-4">
  <button
    type="submit"
    disabled={loading}
    className="px-6 py-2 bg-customBlue3 text-white rounded-xl hover:bg-customBlue2 transition disabled:opacity-50"
  >
    {loading ? "Adding..." : "Add Post"}
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
