import { useState, useEffect } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { updateSession, fetchSessionById } from "../../store/reducers/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

export default function EditSessionForm() {
  const session = useSelector((state)=>state.session?.session)
  const loadingPage = useSelector((state)=>state.session?.loading)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const nav = useNavigate()
const { committeeId, sessionId } = useParams();
useEffect(()=>{
      if(sessionId){
          dispatch(fetchSessionById(sessionId))
      }
  },[dispatch, sessionId])
useEffect(() => {
    if (session) {
      formik.setValues({
        title: session?.title || "",
        description: session?.description || "",
        date: session?.date || "",
        link: session?.link || ""

      });
    }
  }, [session]);


  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Title must be at least 2 characters")
      .max(50, "Title must be at most 50 characters")
      .required("*Title is required"),
    description: Yup.string()
      .min(2, "Description must be at least 2 characters")
      .max(200, "Description must be at most 200 characters")
      .required("*Description is required"),
    date: Yup.date()
    .typeError("Invalid date format")
    .required("*Date is required"),
        link: Yup.string()
        .typeError("Invalid date format")
        .required("*Link is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const jsonData = {
  title: values.title,
  description: values.description,
  link: values.link,
  date: values.date
};
const result = await dispatch(updateSession({
  committee_id: committeeId,
  session_id: sessionId,
  updatedData: jsonData,
}));        

                      if (result){
                        nav(`/committees/${committeeId}/session-page`)
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
      link: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

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
        
        <div className="flex flex-col w-full md:w-2/3 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
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
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Description
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

          <div>
  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">
    Date
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
    <p className="text-red-500 text-sm mt-1">{formik.errors.link}</p>
  )}
</div>
        </div>
        <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full lg:w-[40%] mx-auto bg-customBlue3 text-white rounded-md py-2 text-sm font-semibold hover:bg-customBlue2 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Save Changes"}
          </button>
      </form>
    </div>
  );
}
