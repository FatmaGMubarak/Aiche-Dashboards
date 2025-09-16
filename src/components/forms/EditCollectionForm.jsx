import { useState, useEffect } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchCollectionById, updateCollection } from "../../store/reducers/collectionSlice";
import { useLocation } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import {fetchProducts} from '../../store/reducers/productSlice'


export default function EditCollectionForm() {
        const {id} = useParams()
  const token = useSelector((state)=>state.auth.token)
  const collection = useSelector((state)=>state.collection?.collection)
  const loadingPage = useSelector((state)=>state.collection?.loading)
  const products = useSelector((state) => state.product.products);
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation()
  const productIds = location.state?.productId || [];
  const productTotal = location.state?.totalPrice || "";
  const [selectedProducts, setSelectedProducts] = useState(productIds || []);


  useEffect(()=>{
      if(id){
          dispatch(fetchCollectionById(id))
          dispatch(fetchProducts())
          if (productIds && productIds.length > 0) {
  setSelectedProducts(productIds);
  formik.setFieldValue("products_id", productIds);
}
      }
  },[dispatch, id])
      const [initialValues, setInitialValues] = useState({
  name: "",
  description: "",
  total: "",
  image: null,
});


useEffect(() => {
    if (collection) {
      const initialProductIds = collection.products?.map(p => p.id) || [];
          const init = {
             name: collection?.name || "",
        description: collection?.description || "",
        total: productTotal || collection?.total || "",
        image: collection?.image || null,
          }
         formik.setValues(init);
    setInitialValues(init);
    setSelectedImage(collection?.image);
    setSelectedProducts(initialProductIds);
    formik.setFieldValue("products_id", initialProductIds);
    }
  }, [collection]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
      .required("*Name is required"),
    description: Yup.string()
      .min(2, "Description must be at least 2 characters")
      .max(4000, "Description must be at most 4000 characters")
      .required("*Description is required"),
    total: Yup.string()
      .required("*Total is required"),
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
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("total", values.total);
      selectedProducts.forEach(id => {
  formData.append("products_id[]", id);
});
      if (values.image) {
        formData.append("image", values.image);
      }

      const result = await dispatch(updateCollection({id, newcollectionData: formData})).unwrap()
      if(result){
        notify("Your collection is updated successfully", "success")
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
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

const handleProductToggle = (productId) => {
  let updatedProducts;
  if (selectedProducts.includes(productId)) {
    updatedProducts = selectedProducts.filter(id => id !== productId);
  } else {
    updatedProducts = [...selectedProducts, productId];
  }

  setSelectedProducts(updatedProducts);
  formik.setFieldValue("products_id", updatedProducts);

  const totalPrice = products
    .filter(product => updatedProducts.includes(product.id))
    .reduce((sum, p) => sum + Number(p.price || 0), 0);

  formik.setFieldValue("total", totalPrice);
};

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
        className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-10"
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
        <div className="mt-6">
  <h3 className="text-lg font-semibold mb-2 text-center">Select Products</h3>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {products.map((product) => (
      <label
        key={product.id}
        className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100"
      >
        <input
          type="checkbox"
          checked={selectedProducts.includes(product.id)}
          onChange={() => handleProductToggle(product.id)}
        />
        <span>{product.name} — ${product.price}</span>
      </label>
    ))}
  </div>
</div>

                          <div className="md:col-span-2 flex justify-center gap-4 mt-5">
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
      </form>
    </div>
  );
}
