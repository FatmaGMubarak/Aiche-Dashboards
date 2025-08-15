import { useState, useEffect } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../store/reducers/productSlice";
import { ThreeDot } from "react-loading-indicators";

export default function EditProductForm() {
  const token = useSelector((state)=>state.auth.token)
  const nav = useNavigate()
  const dispatch = useDispatch()
  const loadingRed = useSelector((state)=>state.product.loading)
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {id} = useParams()
const product = useSelector((state)=>state.product.product)
const [initialValues, setInitialValues] = useState({
  name: "",
  link: "",
  price: "",
  image: null,
});


useEffect(()=>{
    if(id){
        dispatch(fetchProductById(id))
    }
},[dispatch, id])

useEffect(() => {
    if (product) {
      const init = {
                name: product?.name || "",
        link: product?.link || "",
        price: product?.price || 0,
        image: product?.image || null,
      }
       formik.setValues(init);
    setInitialValues(init);
      setSelectedImage(product.image);
    }
  }, [product]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
      .required("*Name is required"),
    link: Yup.string().url("Invalid URL"),
    price: Yup.number()
      .required("*Price is required"),
   img: Yup.mixed()
     .nullable()
     .test("fileSize", "Max img size is 2MB", (value) => {
       if (!value || typeof value === "string") return true;
       return value.size <= 2000000;
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
      formData.append("name", values.name);
      formData.append("link", values.link);
      formData.append("price", values.price);
      if (values.image) {
        formData.append("image", values.image);
      }

      const result = await dispatch(updateProduct({id, newproductData:formData})).unwrap()
      if(result){
        notify("Your product is updated successfully", "success")
        nav("/product-page")
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
      link: "",
      price: 0,
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
    } else {
      formik.setFieldValue("image", null);
    }
  };

  const handleReset = () =>{
  setSelectedImage(initialValues.image);
  }

    const handleCancel = () => {
  formik.setValues(initialValues);

};

  if (loadingRed) {
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
                  crossOrigin="anonymous"
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
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Price
            </label>
            <input
            type="text"
              id="price"
              name="price"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3 resize-none"
              value={formik.values.price}
              onChange={(e)=>formik.setFieldValue("price", Number(e.target.value))}
            />
            {formik.errors.price && formik.touched.price && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.price}
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
