import { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  fetchTaskById, updateTask } from "../../store/reducers/taskSlice";
import { ThreeDot } from "react-loading-indicators";

export default function EditTaskForm() {
    const task = useSelector((state)=>state.task?.task)
    const loadingPage = useSelector((state)=>state.task?.loading)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const nav = useNavigate()
const { committeeId, taskId } = useParams();
  useEffect(()=>{
      if(taskId){
          dispatch(fetchTaskById(taskId))
      }
  },[dispatch, taskId])
  useEffect(() => {
    if (task) {
      formik.setValues({
        title: task?.title || "",
        description: task?.description || "",
        link: task?.link || null,
      });
    }
  }, [task]);
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Event must be at least 2 characters")
      .max(50, "Event must be at most 50 characters")
      .required("*Event is required"),
    description: Yup.string()
      .min(2, "Description must be at least 2 characters")
      .max(4000, "Description must be at most 4000 characters")
      .required("*Description is required"),
    link: Yup.string()
    .typeError("Invalid link format")
    .required("*Link is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const jsonData = {
  title: values.title,
  description: values.description,
  link: values.link,
};

const result = await dispatch(updateTask({
  committee_id: committeeId,
  task_id: taskId,
  updatedData: jsonData,
}));

              if (result){
                notify("Your task is updated successfully", "success")
                nav(`/committees/${committeeId}/task-page`)
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
        
        <div className="flex flex-col w-full md:w-2/3 gap-3">

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
