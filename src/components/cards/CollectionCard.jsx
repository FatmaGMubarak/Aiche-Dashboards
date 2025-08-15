import img from '../../assets/block.png';
import { fetchCollections, deleteCollection } from '../../store/reducers/collectionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import notify from '../../hooks/Notifications';
import DeleteModal from '../confirm/DeleteModal';
import { ThreeDot } from 'react-loading-indicators';

export default function CollectionCard() {
  const collections = useSelector((state) => state.collection.collections);
  const loading = useSelector((state) => state.collection.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleDelete = (id) => {
    setCollectionToDelete(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    dispatch(deleteCollection(collectionToDelete));
    notify("You deleted this collection successfully", "success");
    setIsModalOpen(false);
    nav("/collection-page");
  };

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
            className="relative group w-full h-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => handleDelete(collection?.id)}
              className="absolute top-2 right-2 p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 lg:hidden lg:group-hover:block"
              title="Delete"
            >
              <FiTrash2 size={20} />
            </button>

            <div className="h-52 sm:h-60 flex items-center justify-center p-5 sm:p-8 overflow-hidden border-b">
              <img
                src={collection?.image || img}
                alt={collection?.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="px-5 pt-4 pb-5 flex flex-col flex-grow">
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {collection?.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {collection?.description}
                </p>
              </div>

              <span className="mt-3 text-center text-lg font-semibold text-customBlue2">
                Total: {collection?.total} EGP
              </span>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Included Products:
                </h3>

                <div className="max-h-40 overflow-y-auto space-y-3 pr-1">
                  {collection.products && collection.products.length > 0 ? (
                    collection.products.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-3 text-sm border-b pb-2"
                      >
                        <img
                          src={product.image || img}
                          alt={product.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-gray-800 dark:text-white font-medium">
                            {product.title}
                          </span>
                          <span className="text-gray-500">{product.price} EGP</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No products available.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Link
                  className="inline-block bg-customBlue3 text-white px-4 py-1.5 rounded-lg hover:bg-customBlue2 transition text-sm"
                  to={`/edit-collection-form/${collection.id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
