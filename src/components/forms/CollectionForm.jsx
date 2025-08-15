import { useState } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { createCollection } from "../../store/reducers/collectionSlice";
import { useLocation } from "react-router-dom";

export default function CollectionForm() {
  const token = useSelector((state)=>state.auth.token)
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation()
  const productIds = location.state?.productId || [];
  const productTotal = location.state?.totalPrice || "";
      const [initialValues] = useState({
  name: "",
  description: "",
  image: null,
});

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
      .required("*Name is required"),
    description: Yup.string()
      .min(2, "Description must be at least 2 characters")
      .max(200, "Description must be at most 200 characters")
      .required("*Description is required"),
    // total: Yup.string()
    //   .required("*Description is required"),
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
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("total", productTotal);
      productIds.forEach(id => {
  formData.append("products_id[]", id);
});
      if (values.image) {
        formData.append("image", values.image);
      }

      const result = await dispatch(createCollection(formData)).unwrap()
      if(result){
        notify("Your collection is added successfully", "success")
        nav("/collection-page")
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
      total: productTotal,
      image: null,
      products_id: productIds,
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
    } else {
      formik.setFieldValue("image", null);
    }
  };


    const handleCancel = () => {
  setSelectedImage(initialValues.image);
};

  return (
    <div className=" w-full flex justify-center items-center py-8  mt-0 lg:mt-10 pb-0 pt-24 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-4xl"
      >
        
        <div className="p-8 flex flex-col md:flex-row gap-8 ">
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
    onClick={handleCancel}
    className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400 transition"
  >
    Reset
  </button>
</div>
        </div>

        <div className="flex flex-col w-full md:w-2/3 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"
              value={formik.values.name}
              onChange={formik.handleChange}
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
              Description
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
            <label
              htmlFor="total"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Total
            </label>
            <input
            type="text"
              id="total"
              name="total"
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3 resize-none"
              value={formik.values.total}
              onChange={formik.handleChange}
            />
            {formik.errors.total && formik.touched.total && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.total}
              </p>
            )}
          </div>





        </div>
        
        </div>
                 <div className="w-full flex justify-between items-center mb-3 ">
           <button
          onClick={()=>nav("/product-page")}
          
            className="mt-4 w-full mx-auto lg:w-[30%] bg-gray-300 text-customBlue2 rounded-md py-2 text-sm font-semibold hover:bg-gray-400 transition-all disabled:opacity-50"
          >
            Back to products
          </button>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full mx-auto lg:w-[30%] bg-customBlue3 text-white rounded-md py-2 text-sm font-semibold hover:bg-customBlue2 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Add Collection"}
          </button>
         </div>
      </form>
    </div>
  );
}
