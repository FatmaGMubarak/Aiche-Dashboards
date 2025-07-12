import { useState } from "react";
import { Formik, useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { createMaterial } from "../../store/reducers/materialSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function MaterialForm() {
  const nav = useNavigate()
const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const semesters =["semester 1", "semester 2", "semester 3", "semester 4", "semester 5", "semester 6", "semester 7", "semester 8", "semester 9", "semester 10",] 
  const department =["General","Computer Science", "Artificial Intelligence", "Information Technology"]
  const validationSchema = Yup.object({
    name: Yup.string()
    .min(2, "name must be at least 2 characters")
    .max(50, "name must be at most 50 characters")
    .required("*name is required"),
    semester: Yup.string()
      .min(2, "semester must be at least 2 characters")
      .max(50, "semester must be at most 50 characters")
      .required("*semester is required"),
    department: Yup.string()
      .min(2, "department must be at least 2 characters")
      .max(200, "department must be at most 200 characters")
      .required("*department is required"),
    link: Yup.string()
    .typeError("Invalid date format")
    .required("*link is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", String(values.name));
      formData.append("semester", String(values.semester));
      formData.append("department", String(values.department));
      formData.append("link", String(values.link));
  
      const result = await dispatch(createMaterial({materialData: formData})).unwrap();
      if (result) {
        nav("/material-page");
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
      semester: "",
      department: "",
      link: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


  return (
    <div className=" w-full flex justify-center items-center py-8  mt-0 lg:mt-10 pb-0 pt-16">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8 flex flex-col gap-8"
      >
        
        <div className="flex flex-col w-full md:w-2/3 gap-3">
        <div>
            <label htmlFor="name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
>
                name
            </label>
            <input type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
                              className="w-full border border-gray-300 mt-2 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"

            />
                        {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
</div>
          <div>
          <label
    htmlFor="semester"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    semester
  </label>
 <select
  id="semester"
  name="semester"
  value={formik.values.semester}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-customBlue3 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-customBlue3 dark:focus:border-blue-500"
>
  <option value="" disabled hidden>
    Select semester
  </option>
  {semesters.map((ele, index) => (
    <option key={index} value={ele}>
      {ele}
    </option>
  ))}
</select>
            {formik.errors.semester && formik.touched.semester && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.semester}
              </p>
            )}
          </div>
          <div>
          <label
    htmlFor="department"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    department
  </label>
  <select
  id="department"
  name="department"
  value={formik.values.department}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-customBlue3 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-customBlue3 dark:focus:border-blue-500"
>
  <option value="" disabled hidden>
    Select department
  </option>
  {department.map((ele, index) => (
    <option key={index} value={ele}>
      {ele}
    </option>
  ))}
</select>

            {formik.errors.department && formik.touched.department && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.department}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="link"
                className="block text-sm font-medium text-gray-900 dark:text-white"
>
                link
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



        </div>
        <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full lg:w-[40%] mx-auto bg-customBlue3 text-white rounded-md py-2 text-sm font-semibold hover:bg-customBlue2 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Add Material"}
          </button>
      </form>
    </div>
  );
}
