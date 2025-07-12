import { useState } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createAward } from "../../store/reducers/awardSlice";
import { useNavigate } from "react-router-dom";

export default function AwardForm() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "title must be at least 2 characters")
      .max(50, "title must be at most 50 characters")
      .required("*title is required"),
    description: Yup.string()
      .min(2, "description must be at least 2 characters")
      .max(200, "description must be at most 200 characters")
      .required("*description is required"),
    date: Yup.date()
    .typeError("Invalid date format")
    .required("*date is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
        formData.append("date", values.date)
              const result = await dispatch(createAward(formData)).unwrap()
              if(result){
                nav("/award-page")
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
      title: "",
      description: "",
      date: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


  return (
    <div className=" w-full flex justify-center items-center py-8  mt-0 lg:mt-10 pb-0 pt-16">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8 flex flex-col gap-8 items-center justify-center"
      >
        
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.title}
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
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div>
  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">
    date
  </label>
  <input
    type="date"
    id="date"
    name="date"
    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"
    value={formik.values.date}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.date && formik.touched.date && (
    <p className="text-red-500 text-sm mt-1">{formik.errors.date}</p>
  )}
</div>


        </div>
        <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full lg:w-[40%] mx-auto bg-customBlue3 text-white rounded-md py-2 text-sm font-semibold hover:bg-customBlue2 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Add Award"}
          </button>
      </form>
    </div>
  );
}
