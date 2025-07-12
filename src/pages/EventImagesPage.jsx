import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventById, deleteImage } from "../store/reducers/eventSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventImagesPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const initialEvents = useSelector((state) => state.event?.event);
  const eventImages = useSelector((state)=>state.event?.event?.image)
  const [events, setEvents] = useState(initialEvents);
  const [tempEvents, setTempEvents] = useState(initialEvents);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteImage = (imageId) => {
    dispatch(deleteImage(imageId));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (initialEvents) {
      setEvents(initialEvents);
      setTempEvents([{ ...initialEvents, image: initialEvents.image || [] }]);
    }
  }, [initialEvents]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  
    setTempEvents((prev) => {
      const current = prev[0] || {};
      const updatedImages = [...(current.image || []), ...newImages];
      return [{ ...current, image: updatedImages }];
    });
  
    setIsEditing(true);
  };
  

  const handleSave = async () => {
    const formData = new FormData();

    const event = tempEvents[0];

    event.image.forEach((imgObj) => {
      if (imgObj.file) {
        formData.append("images", imgObj.file);
      }
    });

    try {
      // await axios.post(`/api/events/${id}/upload-images`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      alert("Images uploaded successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload images.");
    }
  };

  const handleCancel = () => {
    setTempEvents([{ ...events, image: events.image || [] }]);
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 pt-28 px-5">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:relative">
        <div className="flex justify-center items-center w-full mx-auto">
          <h2 className="text-3xl font-bold text-center text-customBlue1 mb-8">
            Event Gallery
          </h2>
        </div>
        <div className="flex justify-center sm:justify-end items-center">
          <label
            htmlFor="imageUpload"
            className="flex items-center gap-2 text-white bg-customBlue3 hover:bg-customBlue2 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 sm:absolute sm:right-12 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add Image
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-10">
        {tempEvents && tempEvents[0] && (
          <div
            key={tempEvents[0].id}
            className="bg-white shadow-xl rounded-2xl p-6 space-y-4"
          >
            <h2 className="text-2xl font-semibold text-blue-700">
              {tempEvents[0].title}
            </h2>
            <p className="text-gray-600">{tempEvents[0].description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tempEvents[0].image.map((img) => (
  <div key={img?.id} className="relative group">
    <img
      src={img.preview || img.image_path}
      alt={`Event Image ${img.id + 1}`}
      className="rounded-lg w-full h-48 object-cover shadow-md group-hover:opacity-75 transition"
    />
    <button
    onClick={()=>handleDeleteImage(img?.id)}
      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-opacity opacity-0 group-hover:opacity-100"
    >
      ✕
    </button>
  </div>
))}
            </div>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleSave}
            className="bg-customBlue1 text-white px-6 py-2 rounded-lg hover:bg-customBlue3"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
