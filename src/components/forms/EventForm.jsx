import { useState } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { createEvent } from "../../store/reducers/eventSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EventForm() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().min(2).max(50).required("*title is required"),
    description: Yup.string().min(2).max(200).required("*description is required"),
    images: Yup.mixed()
      .test("fileSize", "Each image must be <= 5MB", files => !files || files.every(file => file.size <= 5 * 1024 * 1024))
      .test("fileType", "Unsupported file type", files => !files || files.every(file => ["image/jpg", "image/jpeg", "image/png"].includes(file.type))),
    start_date: Yup.string().required("*Date is required"),
    end_date: Yup.string().required("*Date is required"),
    category: Yup.string().required("*category is required").notOneOf([""], "*category is required"),
    facebookLink: Yup.string().url("Invalid URL"),
    formLink: Yup.string().url("Invalid URL").when("isOnline", {
      is: true,
      then: schema => schema.required("Form link is required for online events"),
      otherwise: schema => schema.notRequired()
    }),
    isOnline: Yup.boolean(),
    place: Yup.string().when("isOnline", {
      is: val => val === false || val === "false",
      then: schema => schema.required("place is required for offline events"),
      otherwise: schema => schema.notRequired()
    }),
    status: Yup.string().required("*status is required").oneOf(["open", "closed"], "*Invalid status")
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      images: [],
      start_date: "",
      end_date: "",
      category: "",
      place: "",
      facebookLink: "",
      formLink: "",
      isOnline: false,
      status: "open"
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, val]) => {
          if (key === "images" && val.length > 0) {
            val.forEach(img => formData.append("images[]", img));
          } else {
            formData.append(key, val);
          }
        });
        const result = await dispatch(createEvent(formData)).unwrap();
        if (result){
                  notify("Your event is added successfully", "success")
nav("/event-page");
        } 
      } catch (error) {
        const err = error;
        const message = Array.isArray(err) ? err[0] : err?.message || err || "Something went wrong";
        notify(message, "error");
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    }
  });

  const handleImageUpload = e => {
    const files = Array.from(e.currentTarget.files);
    setSelectedImages(files);
    formik.setFieldValue("images", files);
  };

  return (
    <div className="w-full flex justify-center items-center py-8 mt-0 lg:mt-[350px] pt-16">
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8 mb-5">
        <div className="flex flex-col items-center w-full md:w-1/3">
          <label htmlFor="images" className="cursor-pointer group">
            <div className="relative w-32 h-32 rounded-full border-4 border-customBlue3 overflow-hidden group-hover:opacity-90 transition-all">
              {selectedImages.length > 0 ? (
                <div className="flex gap-2">
                  {selectedImages.map((img, idx) => (
                    <img key={idx} src={URL.createObjectURL(img)} alt={`Preview ${idx}`} className="object-cover w-16 h-16 rounded-full" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-customBlue3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-xs text-center mt-1">Upload Photos</span>
                </div>
              )}
            </div>
            <input type="file" id="images" name="images" accept="image/*" className="hidden" multiple onChange={handleImageUpload} />
          </label>
          {formik.errors.images && formik.touched.images && <p className="text-red-500 text-sm mt-2 text-center">{formik.errors.images}</p>}
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Title", id: "title", type: "text" },
            { label: "Category", id: "category", type: "select", options: ["cat_1", "cat-2", "cat_3", "cat_4"] },
            { label: "Form Link", id: "formLink", type: "text" },
            { label: "Facebook Link", id: "facebookLink", type: "text" },
            { label: "Start Date", id: "start_date", type: "date" },
            { label: "End Date", id: "end_date", type: "date" },
          ].map(({ label, id, type, options }) => (
            <div key={id} className="col-span-1">
              <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              {type === "select" ? (
                <select
                  id={id}
                  name={id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[id]}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"
                >
                  <option value="">Choose a category</option>
                  {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  type={type}
                  id={id}
                  name={id}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"
                  value={formik.values[id]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              )}
              {formik.errors[id] && formik.touched[id] && <p className="text-red-500 text-sm mt-1">{formik.errors[id]}</p>}
            </div>
          ))}

          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3 resize-none"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.description && formik.touched.description && <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>}
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-700">Event Type</span>
            {[
              { value: true, label: "Online" },
              { value: false, label: "Offline" },
            ].map(({ value, label }) => (
              <label key={label} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="isOnline"
                  value={value}
                  checked={formik.values.isOnline === value}
                  onChange={() => formik.setFieldValue("isOnline", value)}
                  onBlur={formik.handleBlur}
                  className="accent-customBlue3"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {!formik.values.isOnline && (
            <div className="col-span-2">
              <label htmlFor="place" className="block text-sm font-semibold text-gray-700 mb-1">Place</label>
              <input
                type="text"
                id="place"
                name="place"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customBlue3"
                value={formik.values.place}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.place && formik.touched.place && <p className="text-red-500 text-sm mt-1">{formik.errors.place}</p>}
            </div>
          )}

          <div className="col-span-2 flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-700">Status</span>
            {["open", "closed"].map(status => (
              <label key={status} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={formik.values.status === status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="accent-customBlue3"
                />
                <span>{status}</span>
              </label>
            ))}
            {formik.errors.status && formik.touched.status && <p className="text-red-500 text-sm mt-1">{formik.errors.status}</p>}
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-customBlue3 text-white rounded-md py-2 text-sm font-semibold hover:bg-customBlue2 transition-all disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Add Event"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}