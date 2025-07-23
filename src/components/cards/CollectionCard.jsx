import img from '../../assets/block.png';
import { fetchCollections, deleteCollection } from '../../store/reducers/collectionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import notify from '../../hooks/Notifications';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../confirm/DeleteModal';
import { ThreeDot } from 'react-loading-indicators';

export default function CollectionCard() {
  const collections = useSelector((state) => state.collection.collections);
  const loading = useSelector((state) => state.collection.loading);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [collectionToDelete, setCollectionToDelete] = useState(null)
  const nav = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleDelete = (id) =>{
    setCollectionToDelete(id)
  setIsModalOpen(true)
}

const handleCancel = () =>{
  setIsModalOpen(false)
}

const handleConfirm = () =>{
  dispatch(deleteCollection(collectionToDelete))
  notify("You deleted this award successfully", "success")
  setIsModalOpen(false)
  nav("/collection-page")
}

    if (loading) {
      return (
        <div className="max-w-5xl mx-auto px-5 flex justify-center items-start">
          <ThreeDot color="#05284B" size="medium" text="" textColor="" />
        </div>
      );
    }


  return (
    <>
     <DeleteModal
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isOpen={isModalOpen}
        message="Are you sure you want to delete this Collection?"
        />
    
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-2 sm:px-24 mx-auto gap-4 py-5">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="relative group w-full h-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          
          <button
            onClick={() => handleDelete(collection.id)}
            className="absolute top-2 right-2 p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hidden group-hover:block"
            title="Delete"
          >
            <FiTrash2 size={20} />
          </button>

          
          <div className="h-52 sm:h-60 flex items-center justify-center p-5 sm:p-8 overflow-hidden rounded-t-lg">
            <img
              src={collection.image || img}
              alt={collection.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          
          <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
            <div className="text-center min-h-[100px]">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {collection.name}
              </h1>
              <h5 className="text-sm font-semibold tracking-tight text-gray-700 dark:text-gray-300 mt-1">
                {collection.description}
              </h5>
            </div>

            <div className="flex flex-col items-center mt-4 gap-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${collection.total}
              </span>
              <Link
                to={`/collection-product-page/${collection.id}`}
                className="text-white bg-customBlue3 hover:bg-customBlue2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
