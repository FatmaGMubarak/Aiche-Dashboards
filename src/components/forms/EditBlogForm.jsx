import { useState, useEffect } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import {fetchBlogById, updateBlog} from "../../store/reducers/blogSlice"
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

export default function EditBlogForm() {
    const {id} = useParams()
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const blog = useSelector((state)=>state.blog?.blog)
  const loadingPage = useSelector((state)=>state.blog?.loading)
  // const admin = ["Admin 1", "Admin 2", "Admin 3", "Admin 4", "Admin 5", "Admin 6", "Admin 7","Admin 8"]
useEffect(()=>{
    if(id){
        dispatch(fetchBlogById(id))
    }
},[dispatch, id])

useEffect(() => {
    if (blog) {
      formik.setValues({
        title: blog?.title || "",
        description: blog?.description || "",
        image: blog?.image || null,
      });
      setSelectedImage(blog.image);
      console.log(blog.image)
    }
  }, [blog]);
  const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(2, "Description must be at least 2 characters")
    .max(200, "Description must be at most 200 characters"),

  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "Max image size is 2MB",
      (value) =>
        !value ||
        typeof value === "string" ||
        value.size <= 2000000
    )
    .test(
      "fileType",
      "Unsupported file type",
      (value) =>
        !value ||
        typeof value === "string" ||
        ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    ),
});


  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
       
      formData.append("image", values.image);
    
      const result = await dispatch(updateBlog({id, newBlogData:formData})).unwrap()
      if(result){
        nav("/blog-home")
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
      description: "",
      image: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageUpload = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      formik.setFieldValue("image", file);
    }
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
        className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8"
      >
        
        <div className="flex flex-col items-center w-full md:w-1/3">
          <label htmlFor="image" className="cursor-pointer group">
            <div className="relative w-32 h-32 rounded-full border-4 border-customBlue3 overflow-hidden group-hover:opacity-90 transition-all">
              {selectedImage ? (
                <img
                  src={selectedImage}
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
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              onBlur={formik.handleBlur}

            />
          </label>
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {formik.errors.image}
            </p>
          )}
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

            {/* <div>
            <label
    htmlFor="countries"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Created By:
  </label>
  <select
    id="countries"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-customBlue3 focus:border-customBlue3 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-customBlue3 dark:focus:border-customBlue3"
  >
    <option value="">Choose an admin</option>
            {admin.map((ele, index)=>{
              return(
                <option value="US" key={index}>{ele}</option>

              )
            })}
  </select>
            </div> */}


          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full mx-auto lg:w-[50%] bg-customBlue3 text-white rounded-md py-2 text-sm font-semibold hover:bg-customBlue2 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
