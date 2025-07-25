import { useState } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createCommittee } from "../../store/reducers/committeeSlice";
import { useNavigate } from "react-router-dom";

export default function CommitteeForm() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [selectedimg, setSelectedimg] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "name must be at least 2 characters")
      .max(50, "name must be at most 50 characters")
      .required("*name is required"),
    description: Yup.string()
      .min(2, "description must be at least 2 characters")
      .max(200, "description must be at most 200 characters")
      .required("*description is required"),
    img: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "Max img size is 2MB",
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
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (values.img) {
        formData.append("img", values.img);
      }
      const result = await dispatch(createCommittee(formData)).unwrap()
      if(result){
                notify("Your committee is added successfully", "success")

        nav("/committee-page")
      }
        } catch (error) {
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
      name: "",
      description: "",
      img: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleimgUpload = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setSelectedimg(imgUrl);
      formik.setFieldValue("img", file);
    } else {
      formik.setFieldValue("img", null);
    }
  };

  return (
    <div className=" w-full flex justify-center items-center py-8  mt-0 lg:mt-10 pb-0 pt-24 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8"
      >
        
        <div className="flex flex-col items-center w-full md:w-1/3">
          <label htmlFor="img" className="cursor-pointer group">
            <div className="relative w-32 h-32 rounded-full border-4 border-customBlue3 overflow-hidden group-hover:opacity-90 transition-all">
              {selectedimg ? (
                <img
                  src={selectedimg}
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
              id="img"
              name="img"
              accept="img/*"
              className="hidden"
              onChange={handleimgUpload}
              onBlur={formik.handleBlur}

            />
          </label>
          {formik.errors.img && formik.touched.img && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {formik.errors.img}
            </p>
          )}
        </div>

        <div className="flex flex-col w-full md:w-2/3 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              description
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3 resize-none"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full mx-auto lg:w-[50%] bg-customBlue3 text-white rounded-md py-2 text-sm font-semibold hover:bg-customBlue2 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Add Committee"}
          </button>
        </div>
      </form>
    </div>
  );
}
