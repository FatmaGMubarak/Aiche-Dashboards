import { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { fetchMaterialById, updateMaterial } from "../../store/reducers/materialSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";


export default function EditMaterialForm() {
    const { id } = useParams()
  const nav = useNavigate()
const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const semesters =["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8", "Semester 9", "Semester 10",] 
  const department =["General","Computer Science", "Artificial Intelligence", "Information Technology"];
  useEffect(()=>{
      if(id){
          dispatch(fetchMaterialById(id))
      }
  },[dispatch, id])
 const [initialValues, setInitialValues] = useState({
  name: "",
  semester: "",
  link: "",
  department: "",
});
  const material = useSelector((state)=>state.material?.material)
  const loadingPage = useSelector((state)=>state.material?.loading)
  useEffect(() => {
    if (material) {
          const init = {
             name: material?.name || "",
        semester: material?.semester || "",
        link: material?.link || "",
        department: material?.department || "",

          }
          formik.setValues(init);
    setInitialValues(init);
      
    }
  }, [material]);
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
  
      const result = await dispatch(updateMaterial({id, newMaterialData: values})).unwrap();
      if (result) {
        notify("Your material is updated successfully", "success")
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
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

    const handleCancel = () => {
  formik.setValues(initialValues);
};

      if(loadingPage){
          return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }


  return (
    <div className=" w-full flex justify-center items-center py-8  mt-0 lg:mt-10 pb-0 pt-24 px-4">
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
                   <div className="md:col-span-2 flex justify-center gap-4">
  <button
    type="submit"
    disabled={loading}
    className="px-6 py-2 bg-customBlue3 text-white rounded-xl hover:bg-customBlue2 transition disabled:opacity-50"
  >
    {loading ? "Saving.." : "Save Material"}
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
      </form>
    </div>
  );
}
