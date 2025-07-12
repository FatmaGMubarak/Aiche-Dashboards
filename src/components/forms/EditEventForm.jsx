import { useState, useEffect } from "react";
import { useFormik } from "formik";
import notify from "../../hooks/Notifications";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent, fetchEventById } from "../../store/reducers/eventSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEventForm() {
  const event = useSelector((state)=>state.event?.event)
  const {id} = useParams()
  const nav = useNavigate()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(()=>{
      if(id){
          dispatch(fetchEventById(id))
      }
  },[dispatch, id])


  useEffect(() => {
    if (event) {
      formik.setValues({
        title: event?.title || "",
        description: event?.description || "",
        start_date: event?.start_date || "",
        end_date: event?.end_date || "",
        category: event?.category || "",
        place: event?.place || "",
        formLink: event?.formLink || "",
        facebookLink: event?.facebookLink || "",
        status: event?.status || ""
      });
    }
  }, [event]);
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "title must be at least 2 characters")
      .max(50, "title must be at most 50 characters")
      .required("*title is required"),
    description: Yup.string()
      .min(2, "description must be at least 2 characters")
      .max(200, "description must be at most 200 characters")
      .required("*description is required"),
      start_date: Yup.date()
      .typeError("Invalid date format")
      .required("*Date is required"),
    end_date: Yup.date()
      .typeError("Invalid date format")
      .required("*Date is required"),
    category: Yup.string().required("*category is required"),
    facebookLink: Yup.string()
      .url("Invalid URL")
      
      .required("*Link is required"),
    formLink: Yup.string().url("Invalid URL").required("*Form Link is required"),
    isOnline: Yup.boolean(),
    place: Yup.string().when('isOnline', {
      is: (val) => val === false || val === 'false',
      then: (schema) => schema.required('place is required for offline events'),
      otherwise: (schema) => schema.notRequired(),
    }),
    status: Yup.string().required("*status is required").oneOf(["open", "closed"], "*Invalid status"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const jsonData = {
        title: formik.values.title,
        description: formik.values.description,
        start_date: formik.values.start_date,
        end_date: formik.values.end_date,
        place: formik.values.place,
        category: formik.values.category,
        facebookLink: formik.values.facebookLink,
        formLink: formik.values.formLink,
        status: formik.values.status,
      };

      const result = await dispatch(updateEvent({id, newEventData:jsonData})).unwrap()
      console.log(result)
      if(result){
nav("/event-page")
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
      start_date: "",
      end_date: "",
      category: "",
      place: "",
      facebookLink: "",
      formLink: "",
      // isOnline: false,
      status: "open",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className=" w-full flex justify-center items-center py-8  mt-0 lg:mt-10 pb-0 pt-16">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 flex flex-col gap-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full border rounded px-4 py-2 text-sm focus:ring-2 focus:ring-customBlue3"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="description">description</label>
          <textarea
            name="description"
            id="description"
            rows="4"
            className="w-full border rounded px-4 py-2 text-sm focus:ring-2 focus:ring-customBlue3 resize-none"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded px-4 py-2 text-sm"
          >
            <option value="" disabled>{formik.values?.category}</option>
            <option value="cat_1">category 1</option>
            <option value="cat_2">category 2</option>
            <option value="cat_3">category 3</option>
            <option value="cat_4">category 4</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm">{formik.errors.category}</p>
          )}
        </div>

        <div className="flex gap-4 items-center">
          <label className="font-semibold text-sm">Event Type:</label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="isOnline"
              value="true"
              checked={formik.values.isOnline === true}
              onChange={() => formik.setFieldValue("isOnline", true)}
              onBlur={formik.handleBlur}
            />
            Online
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="isOnline"
              value="false"
              checked={formik.values.isOnline === false}
              onChange={() => formik.setFieldValue("isOnline", false)}
              onBlur={formik.handleBlur}
            />
            Offline
          </label>
        </div>

        {!formik.values.isOnline && (
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="place">place</label>
            <input
              type="text"
              name="place"
              id="place"
              className="w-full border rounded px-4 py-2 text-sm"
              value={formik.values.place}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.place && formik.errors.place && (
              <p className="text-red-500 text-sm">{formik.errors.place}</p>
            )}
          </div>
        )}

                  <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="formLink">Form Link</label>
                  <input
                    type="url"
                    name="formLink"
                    id="formLink"
                    className="w-full border rounded px-4 py-2 text-sm"
                    value={formik.values.formLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.formLink && formik.errors.formLink && (
                    <p className="text-red-500 text-sm">{formik.errors.formLink}</p>
                  )}
                </div>

        <div className="flex flex-col md:flex-row gap-4">
        <div>
  <label htmlFor="start_date" className="block text-sm font-semibold text-gray-700 mb-1">
    Start Date
  </label>
  <input
  type="date"
  id="start_date"
  name="start_date"
  className="..."
  value={formik.values.start_date}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
{formik.errors.start_date && formik.touched.start_date && (
  <p className="text-red-500 text-sm mt-1">
    {formik.errors.start_date}
  </p>
)}
  {formik.errors.start_date && formik.touched.start_date && (
    <p className="text-red-500 text-sm mt-1">{formik.errors.start_date}</p>
  )}
</div>
          <div>
  <label htmlFor="end_date" className="block text-sm font-semibold text-gray-700 mb-1">
    End Date
  </label>
  <input
  type="date"
  id="end_date"
  name="end_date"
  className="..."
  value={formik.values.end_date}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
{formik.errors.end_date && formik.touched.end_date && (
  <p className="text-red-500 text-sm mt-1">
    {formik.errors.end_date}
  </p>
)}
</div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="facebookLink">Facebook Link</label>
          <input
            type="url"
            id="facebookLink"
            name="facebookLink"
            className="w-full border rounded px-4 py-2 text-sm"
            value={formik.values.facebookLink}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.facebookLink && formik.errors.facebookLink && (
            <p className="text-red-500 text-sm">{formik.errors.facebookLink}</p>
          )}
        </div>



        <div className="flex flex-col gap-2">
  <span className="text-sm font-semibold text-gray-700">Status</span>
  <label className="inline-flex items-center gap-2">
    <input
      type="radio"
      name="status"
      value="open"
      checked={formik.values.status === "open"}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="accent-blue-500"
    />
    <span>open</span>
  </label>

  <label className="inline-flex items-center gap-2">
    <input
      type="radio"
      name="status"
      value="closed"
      checked={formik.values.status === "closed"}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="accent-blue-500"
    />
    <span>closed</span>
  </label>

  {formik.errors.status && formik.touched.status && (
    <p className="text-red-500 text-sm mt-1">{formik.errors.status}</p>
  )}
</div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
