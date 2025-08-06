import { useState, useEffect } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCommittee, fetchCommitteeById } from "../../store/reducers/committeeSlice";
import { ThreeDot } from "react-loading-indicators";

export default function EditCommitteeForm() {
  const {id} = useParams()
  const nav = useNavigate()
  const dispatch = useDispatch()
  const committee = useSelector((state)=>state.committee?.committee)
  const loadingPage = useSelector((state)=>state.committee?.loading)
  const [loading, setLoading] = useState(false);
  const [selectedimg, setSelectedimg] = useState(null);
    const [initialValues, setInitialValues] = useState({
  name: "",
  description: "",
  img: null,
});
useEffect(()=>{
    if(id){
        dispatch(fetchCommitteeById(id))
        console.log(committee.img)
    }
},[dispatch, id])
useEffect(() => {
    if (committee) {
      const init = {
         name: committee?.name || "",
        description: committee?.description || "",
        img: committee?.img || null,
      }
                formik.setValues(init);
    setInitialValues(init);
      setSelectedimg(committee.img);
    }
  }, [committee]);
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
      formData.append("description", values.description);
      
        if (values.img instanceof File) {
  formData.append("img", values.img);
}
      
      const result = await dispatch(updateCommittee({id, newCommitteeData: formData})).unwrap()
      if(result){
        notify("Your committee is updated successfully", "success")
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

}
 finally {
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

      if(loadingPage){
          return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }

  const handleReset = () =>{
      setSelectedimg(initialValues.img);

  }

  const handleCancel = () => {
  formik.setValues(initialValues);
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
              accept="image/*"
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
            <div className="flex items-center gap-2 mt-4">
  <button
    type="button"
    onClick={() => document.getElementById("img").click()}
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
